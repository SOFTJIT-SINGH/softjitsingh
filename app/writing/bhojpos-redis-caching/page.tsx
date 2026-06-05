import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function BhojPOSPost() {
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
            <span>June 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>5 min read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
            How Redis Caching Cut API Latency by 44% in a Multi-Tenant Restaurant POS
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            From 320ms to 180ms average response time on an Express.js catalog API handling 5K+ monthly requests across isolated restaurant tenants.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Problem</h2>

          <p>
            BhojPOS is a multi-tenant B2B restaurant management platform serving multiple clients with digital menus, order management, and inventory tracking. Each restaurant operates with fully isolated data, custom branding, and independent configuration.
          </p>

          <p>
            The Express.js catalog API — responsible for serving menu items, categories, pricing, and availability — was the most frequently called endpoint. Every page load, every order screen, every inventory check hit it. Under load from multiple restaurants during peak hours (lunch and dinner), average response time sat at 320ms. Peak times pushed it past 500ms.
          </p>

          <p>
            For a restaurant POS, sub-second response time isn't a nice-to-have. Staff are inputting orders while customers wait. Every millisecond of delay compounds across a shift.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The bottleneck</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Each catalog request queried MongoDB directly — join across menu items, categories, modifiers, and pricing tiers. MongoDB's aggregation pipeline handled the join server-side, but with 5K+ monthly requests and no caching, every request paid the full query cost. Multiple restaurants hitting the same API simultaneously meant connection pool contention and repeated aggregation pipeline execution against the same unchanged data.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why This Is Hard</h2>

          <p>
            The naive fix is to cache the entire catalog response in memory:
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`const cache = {};

app.get('/api/:tenantId/catalog', async (req, res) => {
  const key = req.params.tenantId;
  if (cache[key]) return res.json(cache[key]);

  const catalog = await buildCatalog(req.params.tenantId);
  cache[key] = catalog;
  res.json(catalog);
});`}</pre>
          </div>

          <p>
            This breaks immediately in production. The cache has no expiry — menu items could be hours out of date. It has no size limit — memory grows unbounded. It's not distributed — if you scale to multiple Node.js processes, each has its own stale cache. There's no invalidation strategy — when a restaurant updates a price, the cache still serves the old value.
          </p>

          <p>
            The core challenge: <strong className="text-white">cache freshness vs. cache hit rate</strong> in a multi-tenant system where each tenant has different update patterns. A busy restaurant updates its menu hourly. A quiet one updates weekly. A one-size-fits-all TTL penalizes either freshness or hit rate.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Solutions Considered</h2>

          <div className="space-y-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">1. MongoDB read replicas</p>
              <p className="text-sm text-gray-400">Offload reads to a replica set. Problem: replica lag means stale reads anyway. Added infrastructure cost and operational complexity for a single API endpoint. No improvement on query execution time — the aggregation pipeline still runs.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">2. Database indexing + query optimization</p>
              <p className="text-sm text-gray-400">Add composite indexes on the most common query patterns. Worth doing regardless, but the aggregation pipeline's $lookup stage across multiple collections means indexes only help the individual collection scans — the join itself still runs.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5">
              <p className="text-blue-300 font-semibold text-sm mb-1">3. Redis caching with tag-based invalidation (chosen)</p>
              <p className="text-sm text-gray-400">Cache the pre-built catalog response in Redis with tenant-scoped keys and a TTL strategy. When a restaurant updates data, purge only that tenant's cache entries. Redis handles distribution automatically — all Node.js processes share the same cache pool.</p>
            </div>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Solution: Redis Cache-Aside Pattern</h2>

          <p>
            We implemented a cache-aside pattern with Redis. On a cache miss, the application fetches from MongoDB, stores the result in Redis, and returns it. Subsequent requests hit the cache until it expires or is invalidated.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`const CACHE_TTL = 300; // 5 minutes

async function getCatalog(tenantId: string) {
  const cacheKey = \`catalog:\${tenantId}\`;

  // Check Redis first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Build from MongoDB on cache miss
  const catalog = await buildCatalog(tenantId);

  // Store in Redis with TTL
  await redis.setEx(cacheKey, CACHE_TTL, JSON.stringify(catalog));

  return catalog;
}

// Call this when a restaurant updates menu/pricing
async function invalidateCatalog(tenantId: string) {
  await redis.del(\`catalog:\${tenantId}\`);
}`}</pre>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-5 my-6">
            <p className="text-sm text-yellow-200 font-semibold mb-1">Cache invalidation — the real engineering</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The TTL handles eventual consistency. But for immediate freshness, we invalidate the cache when a restaurant updates its menu, pricing, or availability. The invalidation hook is called synchronously after the MongoDB write succeeds. This means the next catalog request after an update will miss the cache and fetch fresh data. The 5-minute TTL is the worst-case staleness if the invalidation hook fails silently — we log and monitor this.
            </p>
          </div>

          <p>
            The tenant-scoped key design <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">{'catalog:{tenantId}'}</code> ensures isolation: one restaurant's update never affects another's cache. The TTL prevents unbounded memory growth and handles edge cases where the invalidation hook doesn't fire.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why Not Just Use a Shorter TTL?</h2>

          <p>
            A shorter TTL (e.g., 60 seconds) would improve freshness but reduce the cache hit rate, especially for restaurants with infrequent updates. The invalidation hook gives us the best of both: the cache stays warm for hours if nothing changes, but clears immediately when data changes. The 5-minute TTL is a safety net, not the primary invalidation mechanism.
          </p>

          <p>
            <strong className="text-white">This is the difference between a cache and a buffer.</strong> A buffer accepts staleness as a design choice. A cache with invalidation treats staleness as an exception. The invalidation hook is the primary eviction signal. The TTL is the circuit breaker.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">44%</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Average Latency Reduction</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">180ms</div>
              <div className="text-xs text-gray-500 font-mono mt-1">New Average Response Time</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">5K+</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Monthly API Requests</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">0</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Cache-Related Incidents</div>
            </div>
          </div>

          <p>
            The Redis cache layer reduced average catalog API response time from 320ms to 180ms — a 44% improvement. Peak-hour response times no longer exceeded 300ms. The cache hit rate stabilized at ~85% across all tenants, meaning 85% of catalog requests never touched MongoDB.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Cache the API response, not the database query.</strong> Caching the pre-joined catalog response eliminates both the query execution time and the serialization/join overhead. In-memory object caching (Redis) is orders of magnitude faster than computing the same result from raw data.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Invalidation hooks beat TTL for freshness-sensitive data.</strong> A TTL-only strategy forces a trade-off between hit rate and staleness. An invalidation hook on write gives you both — the cache clears exactly when data changes, not on an arbitrary timer.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Multi-tenant cache key design matters.</strong> Namespace cache keys by tenant ID to prevent cross-tenant data leaks and ensure isolation. A single flat key space is a bug waiting to happen.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Always have a fallback TTL.</strong> Even with invalidation hooks, monitor cache hit rates and log failed invalidations. The TTL catches edge cases your invalidation logic doesn't cover.</span>
            </li>
          </ul>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6">
            <p className="text-xs text-gray-500 font-mono">Cache hit rate monitoring query</p>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed mt-3 whitespace-pre-wrap">{`const info = await redis.info('stats');
// Parse keyspace_hits and keyspace_misses
const hitRate = keyspaceHits / (keyspaceHits + keyspaceMisses);
// Alert if hit rate drops below 70%`}</pre>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Broader Context</h2>

          <p>
            Cache-aside with invalidation hooks applies to any read-heavy API with infrequent writes. Menu catalogs, product listings, content trees, configuration blobs — any data that is read far more often than it changes. Redis is ideal for this pattern because it's fast, simple, and handles the distributed case (multiple app instances sharing a cache pool) without application-level coordination.
          </p>

          <p className="text-gray-500 text-sm border-t border-white/5 pt-8 mt-12">
            BhojPOS is built with Next.js, MongoDB (Mongoose), Express.js, and JWT-based auth. Redis was integrated at the API layer without changes to the database schema or application business logic.
          </p>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Have a similar scaling challenge? Let's talk about your caching strategy.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Start a Conversation →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
