import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Real-Time Order Tracking and Async PDF Pipelines in a Production Food Supply Platform",
  description: "How Mehar Foods handles live order status broadcasts, automated invoice generation, and rate-limited payment processing without blocking the main server thread.",
  alternates: { canonical: "/writing/meharfoods-socketio-async-pipelines" },
};


export default function MeharFoodsPost() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pt-24 pb-32">
      <article className="max-w-2xl mx-auto px-4 md:px-8">

        <Link href="/writing" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-12 text-sm font-medium group">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Writing
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-4">
            <span>August 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>6 min read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
            Real-Time Order Tracking and Async PDF Pipelines in a Production Food Supply Platform
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How Mehar Foods handles live order status broadcasts, automated invoice generation, and rate-limited payment processing without blocking the main server thread.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Business Problem</h2>

          <p>
            Mehar Foods is a wholesale food distributor in Amritsar. Before the platform existed, the entire order pipeline was phone calls. A restaurant calls in an order. Someone writes it on paper. The delivery driver gets a handwritten note. If the note gets lost, the order gets lost. If the customer calls to ask "where's my delivery?", nobody has a real answer.
          </p>

          <p>
            The owner wanted three things: stop losing orders, let customers track deliveries in real time, and generate invoices automatically instead of writing them by hand.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why This Is Harder Than It Looks</h2>

          <p>
            The tricky part isn't any single feature. It's that all three features (order tracking, invoice generation, payment processing) happen simultaneously and share server resources.
          </p>

          <p>
            When an order's status changes from "Preparing" to "Out for Delivery", three things need to happen at once: Socket.io broadcasts the status update to both the customer and the admin dashboard, the system checks if a PDF invoice needs to be generated, and an email notification fires. If you do all of this synchronously on the Express.js main thread, you block incoming HTTP requests until everything finishes. During a busy morning with 20 orders coming in, that's a recipe for timeouts.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The blocking problem</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              PDFKit generates invoices by building the document in memory — header, line items, totals, footer, business details. For a large order with 30+ line items, this takes 200-400ms of CPU time. If this runs on the main thread, every other request waits.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Socket.io for Live Order Tracking</h2>

          <p>
            Each order gets its own Socket.io room. When the admin updates the status (Placed → Confirmed → Preparing → Out for Delivery → Delivered), the server emits an event to that room. Both the customer's tracking page and the admin dashboard receive the update within milliseconds.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Server-side: Broadcasting order status
io.to(\`order:\${orderId}\`).emit('status_update', {
  orderId,
  status: newStatus,
  updatedAt: new Date().toISOString(),
  estimatedDelivery: calculateETA(newStatus)
});

// Client-side: Listening for updates
socket.on('status_update', (data) => {
  // Update the tracking UI immediately
  setOrderStatus(data.status);
  setETA(data.estimatedDelivery);
});`}</pre>
          </div>

          <p>
            The customer never refreshes the page. The status bar updates live. This is the difference between "let me call and ask" and "I can see it's 10 minutes away."
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Async PDF Generation</h2>

          <p>
            Invoice generation runs outside the request-response cycle. When an order is marked "Delivered", the server queues the PDF job instead of generating it inline. The job picks up the order data from MongoDB, builds the PDF with PDFKit (business header, itemized line items, GST calculations, payment status, delivery notes), saves it to disk, and sends the download link to the customer via Nodemailer.
          </p>

          <p>
            The admin sees "Invoice generated" in their dashboard within a few seconds. The customer receives an email with the PDF attached. None of this blocks the main thread.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Rate Limiting the Payment Flow</h2>

          <p>
            Razorpay handles the actual payment processing, but we still need to protect against abuse. A malicious actor (or a buggy client) could spam the payment creation endpoint. Without rate limiting, that means hundreds of Razorpay order objects being created, which costs nothing individually but creates a mess in the reconciliation dashboard.
          </p>

          <p>
            I used Upstash Redis for rate limiting — 5 payment creation requests per user per minute. The limiter runs as Express middleware, checking the count before the request ever reaches the Razorpay integration layer. Clean, simple, and it costs essentially nothing on Upstash's free tier.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">TanStack Query for Server State</h2>

          <p>
            On the frontend, order lists and status data are managed entirely through TanStack Query. This means automatic background refetching, stale-while-revalidate caching, and optimistic updates when the admin changes an order status. The admin clicks "Mark as Delivered" and the UI updates instantly — the server confirmation arrives a moment later and reconciles silently.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Never generate PDFs on the main thread.</strong> Anything CPU-bound (image processing, document generation, data transformation) should run asynchronously or in a worker.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Socket rooms per entity, not per user.</strong> Grouping connections by order ID means only relevant clients receive updates. Broadcasting to all connected users wastes bandwidth and creates noise.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Rate limit payment endpoints aggressively.</strong> Payment creation is cheap to abuse and expensive to clean up. A simple Redis counter catches 99% of problems.</span>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Need a production order management or supply chain platform?
            </p>
            <Link
              href="/hire"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Let's Build It →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
