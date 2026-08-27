import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function KsartsMLPost() {
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
            <span>7 min read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
            Decoupling Python ML Microservices from Next.js 16
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Architecting a production pipeline for real-time textile demand forecasting without blocking the main web application thread.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Architectural Bottleneck</h2>

          <p>
            When building KSARTS AI—a Decision Support System (DSS) for a textile wholesale business—the core requirement was to integrate heavy Machine Learning models directly into the administrative dashboard. We needed Random Forest for sales prediction, TimeSeries for demand forecasting, K-Means for customer segmentation, and Apriori for bundle recommendations.
          </p>

          <p>
            The dashboard itself was built on Next.js 16. The naive approach to adding ML to a JS-based stack is to try running models via WebAssembly or ONNX.js directly in Node.js. In production, this approach fails spectacularly. Machine Learning inference, especially on large datasets, is CPU-bound. If executed on the same thread as your web server, it will block incoming HTTP requests, cratering your <strong className="text-white">concurrent throughput</strong>.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The Node.js Trap</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Node.js is single-threaded. While it excels at async I/O operations (like querying a database), throwing a 10-second matrix multiplication task at it will block the event loop entirely. No other users will be able to load the dashboard until the ML inference completes.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Solution: Decoupled Microservices</h2>

          <p>
            To maintain a snappy, responsive frontend while processing heavy data, I architected a <strong className="text-white">decoupled microservice architecture</strong>. The Next.js application handles routing, UI, and standard CRUD operations. The ML inference is offloaded to a dedicated Python Flask microservice.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Next.js Route Handler (Client-Facing API)
export async function POST(req: Request) {
  const { tenantId, datasetParams } = await req.json();
  
  // Verify RBAC and Auth
  const session = await verifySession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  // Offload to Python ML Microservice via internal network
  const mlResponse = await fetch(\`\${process.env.ML_SERVICE_URL}/predict/sales\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${internalToken}\` },
    body: JSON.stringify({ tenantId, datasetParams })
  });

  const predictions = await mlResponse.json();
  return NextResponse.json(predictions);
}`}</pre>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Data Synchronization via MongoDB Atlas</h2>

          <p>
            Passing massive arrays of data over HTTP between the Next.js app and the Python service is inefficient. Instead, both services share a connection to the same <strong className="text-white">schema-driven MongoDB Atlas</strong> cluster.
          </p>
          
          <p>
            When Next.js requests a prediction, it simply passes the `tenantId` and query parameters. The Python Flask service independently queries the MongoDB cluster for the historical sales data, runs the Pandas transformations, feeds the data through the Scikit-Learn pipeline, and returns only the finalized forecast back to Next.js.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Securing the Internal Network</h2>

          <p>
            Because the Python microservice has direct database access and runs expensive compute, it cannot be exposed to the public internet. It sits in a private subnet, accessible only by the Next.js server. Furthermore, internal requests are validated using <strong className="text-white">RBAC middleware</strong> and short-lived internal JWTs to ensure zero-trust compliance.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Use the right tool for the job.</strong> Next.js is brilliant for UI and I/O. Python is unrivaled for ML. Don't force one to do the job of the other.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Protect your event loop.</strong> Never run heavy CPU-bound tasks on the main Node.js thread in a production web application.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Database as the integration layer.</strong> Rather than passing large payloads over HTTP, pass identifiers and let microservices query the shared database independently.</span>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Need to integrate complex AI into your SaaS platform without breaking performance?
            </p>
            <Link
              href="/hire"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Let's Discuss Architecture →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
