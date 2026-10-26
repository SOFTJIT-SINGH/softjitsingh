import type { Metadata } from "next";
import { postMetadata } from "@/lib/seo";
import PostShell from "../PostShell";
import Link from "next/link";

export const metadata: Metadata = postMetadata("ksarts-decoupled-ml-microservices");


export default function KsartsMLPost() {
  return (
    <PostShell slug="ksarts-decoupled-ml-microservices">

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Architectural Bottleneck</h2>

          <p>
            When building KSARTS AI—a Decision Support System (DSS) for a textile wholesale business—the core requirement was to integrate heavy Machine Learning models directly into the administrative dashboard. We needed Random Forest for sales prediction, TimeSeries for demand forecasting, K-Means for customer segmentation, and Apriori for bundle recommendations.
          </p>

          <p>
            The dashboard itself was built on Next.js 16. The naive approach to adding ML to a JS-based stack is to try running models via WebAssembly or ONNX.js directly in Node.js. In production, this approach fails spectacularly. Machine Learning inference, especially on large datasets, is CPU-bound. If executed on the same thread as your web server, it will block incoming HTTP requests, cratering your <strong className="text-cream font-medium">concurrent throughput</strong>.
          </p>

          <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-5 my-8">
            <p className="text-sm text-red-300 font-medium mb-1">The Node.js Trap</p>
            <p className="text-sm text-mist leading-relaxed">
              Node.js is single-threaded. While it excels at async I/O operations (like querying a database), throwing a 10-second matrix multiplication task at it will block the event loop entirely. No other users will be able to load the dashboard until the ML inference completes.
            </p>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Solution: Decoupled Microservices</h2>

          <p>
            To maintain a snappy, responsive frontend while processing heavy data, I architected a <strong className="text-cream font-medium">decoupled microservice architecture</strong>. The Next.js application handles routing, UI, and standard CRUD operations. The ML inference is offloaded to a dedicated Python Flask microservice.
          </p>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6 overflow-x-auto">
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed whitespace-pre-wrap">{`// Next.js Route Handler (Client-Facing API)
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

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Data Synchronization via MongoDB Atlas</h2>

          <p>
            Passing massive arrays of data over HTTP between the Next.js app and the Python service is inefficient. Instead, both services share a connection to the same <strong className="text-cream font-medium">schema-driven MongoDB Atlas</strong> cluster.
          </p>
          
          <p>
            When Next.js requests a prediction, it simply passes the `tenantId` and query parameters. The Python Flask service independently queries the MongoDB cluster for the historical sales data, runs the Pandas transformations, feeds the data through the Scikit-Learn pipeline, and returns only the finalized forecast back to Next.js.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Securing the Internal Network</h2>

          <p>
            Because the Python microservice has direct database access and runs expensive compute, it cannot be exposed to the public internet. It sits in a private subnet, accessible only by the Next.js server. Furthermore, internal requests are validated using <strong className="text-cream font-medium">RBAC middleware</strong> and short-lived internal JWTs to ensure zero-trust compliance.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Use the right tool for the job.</strong> Next.js is brilliant for UI and I/O. Python is unrivaled for ML. Don't force one to do the job of the other.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Protect your event loop.</strong> Never run heavy CPU-bound tasks on the main Node.js thread in a production web application.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Database as the integration layer.</strong> Rather than passing large payloads over HTTP, pass identifiers and let microservices query the shared database independently.</span>
            </li>
          </ul>

          <div className="mt-14 rounded-lg border border-line bg-night-2/60 p-6 text-center">
            <p className="text-mist text-sm mb-6">
              Need to integrate complex AI into your SaaS platform without breaking performance?
            </p>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              Let's Discuss Architecture →
            </Link>
          </div>
    </PostShell>
  );
}
