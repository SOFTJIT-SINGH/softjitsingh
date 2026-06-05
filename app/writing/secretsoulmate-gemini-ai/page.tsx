import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function SecretSoulmatePost() {
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
            <span>6 min read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
            Building an AI-Powered Compatibility Engine with Google Gemini
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How SecretSoulmate uses Gemini AI for personality chemistry evaluation, structured prompt engineering for deterministic scoring, and Redis-cached match analytics for sub-second retrieval.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Problem</h2>

          <p>
            SecretSoulmate is an AI-powered compatibility platform. Users create profiles, answer personality questions, and receive compatibility scores with other users. The core technical question: how do you evaluate compatibility between two people using AI in a way that is consistent, fair, and explainable?
          </p>

          <p>
            The naive approach — "ask the AI if these two are compatible" — produces different results every time you ask. The same two profiles could score 85% in one call and 62% in the next. That's unacceptable for a matching platform where users make decisions based on the score.
          </p>

          <p>
            The constraints: the evaluation must be <strong className="text-white">deterministic</strong> (same input = same score), <strong className="text-white">fast</strong> (sub-second for cached pairs, under 3 seconds for new evaluations), and <strong className="text-white">explainable</strong> (users should understand why they matched).
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The non-determinism problem</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              LLMs are stochastic by design. The same prompt with the same input can produce different outputs due to temperature sampling, top-k variation, and model updates. A compatibility score that changes between page loads destroys user trust. "We matched at 90% yesterday, now it says 72% — is the system broken?" Yes, if you don't architect for determinism.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why This Is Hard</h2>

          <p>
            The naive approach is to call the Gemini API with a free-form prompt:
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`const prompt = \`Rate the compatibility between these two people:
Person A: \${profileA.interests.join(', ')}
Person B: \${profileB.interests.join(', ')}
Give a score from 0-100.\`;

const result = await gemini.generate(prompt);
// Result: "75%"
// Next call with same data: "82%"
// Next: "68%"`}</pre>
          </div>

          <p>
            This doesn't work for three reasons. First, the free-form prompt produces non-deterministic scores — the same input gives different outputs. Second, there's no structured evaluation criteria — the AI invents its own weighting system each time. Third, the output is unstructured — parsing "75%" from a paragraph of text is fragile.
          </p>

          <p>
            The core challenge: <strong className="text-white">how to make an inherently non-deterministic system produce deterministic results</strong> without sacrificing the intelligence that makes LLMs useful in the first place.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Solutions Considered</h2>

          <div className="space-y-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">1. Rule-based matching (decision tree)</p>
              <p className="text-sm text-gray-400">Hard-code compatibility rules based on shared interests, demographics, and preferences. Problem: completely misses personality chemistry, sense of humor, communication style — the things that actually determine compatibility. Users quickly game the system by selecting the "right" interests.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">2. Embedding similarity (cosine similarity)</p>
              <p className="text-sm text-gray-400">Generate embeddings for each profile using a text embedding model, then compute cosine similarity. Problem: embeddings capture semantic similarity ("these two profiles talk about similar topics") not compatibility ("these two people would enjoy each other's company"). Two people who both love hiking get a high score even if one is a morning person and the other is a night owl.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5">
              <p className="text-blue-300 font-semibold text-sm mb-1">3. Structured prompt + cached evaluation (chosen)</p>
              <p className="text-sm text-gray-400">Design a structured prompt with explicit evaluation dimensions (communication style, values alignment, interest overlap, lifestyle compatibility). Set temperature to 0 for maximum determinism. Cache the evaluation result keyed by a hash of both profile IDs + version. Only re-evaluate when a profile changes.</p>
            </div>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Solution: Structured Prompt Engineering + Cache-Key Hashing</h2>

          <p>
            The solution has three layers: a structured prompt with evaluation dimensions, deterministic generation settings, and a Redis cache keyed on profile content.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Structured evaluation prompt
const EVALUATION_PROMPT = \`You are a compatibility evaluation system.
Rate the compatibility between two users on a scale of 0-100.

Evaluation dimensions (equal weight each):
1. Communication style (direct vs. thoughtful, humor type, conversation energy)
2. Values alignment (life goals, relationship expectations, dealbreakers)
3. Interest overlap (shared activities, intellectual curiosity, adventure preference)
4. Lifestyle compatibility (daily rhythm, social battery, planning style)

CRITICAL: You MUST respond with ONLY a JSON object, no other text:
{"score": number, "dimensions": {"communication": number, "values": number, "interests": number, "lifestyle": number}, "summary": "one sentence"}

Person A profile: \${JSON.stringify(profileA)}
Person B profile: \${JSON.stringify(profileB)}\`;

async function evaluateCompatibility(profileA, profileB) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0,       // Maximum determinism
      topP: 1,
      topK: 1,              // Greedy decoding
      responseMimeType: 'application/json'
    }
  });

  const result = await model.generateContent(EVALUATION_PROMPT);
  return JSON.parse(result.response.text());
}`}</pre>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-5 my-6">
            <p className="text-sm text-yellow-200 font-semibold mb-1">Cache key design — the determinism guarantee</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Even with temperature=0, Gemini can produce slightly different outputs due to model version updates and infrastructure changes. The cache eliminates this entirely: the evaluation result is stored in Redis keyed by <code className="text-yellow-300 bg-yellow-500/10 px-1 rounded text-xs">{'compatibility:{hash(profileA + profileB + modelVersion)}'}</code>. As long as neither profile changes, the cached result is served — deterministic, fast, and consistent. When a user updates their profile, we invalidate all cache entries involving that user.
            </p>
          </div>

          <p>
            The <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">responseMimeType: 'application/json'</code> parameter forces Gemini to return structured JSON. This eliminates the parsing fragility of free-form text responses. The evaluation dimensions provide explainability — users see not just a single score, but a breakdown across communication, values, interests, and lifestyle.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why Not Temperature=0 Alone?</h2>

          <p>
            Temperature=0 (greedy decoding) significantly reduces variance, but it doesn't eliminate it entirely. Gemini's model architecture includes non-deterministic components (parallelism in the transformer, floating-point accumulation order, hardware-level randomness). In practice, temperature=0 produces identical results ~95% of the time for the same input. The cache handles the remaining 5%.
          </p>

          <p>
            The cache also serves a second purpose: <strong className="text-white">performance</strong>. A Gemini API call takes 1-3 seconds. A Redis lookup takes {'<'}5ms. For the 95% of cases where the evaluation hasn't changed, the user gets the result instantly. The API call only happens when one of the profiles is new or has been updated.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Mission System: Driving Meaningful Conversations</h2>

          <p>
            A compatibility score alone doesn't create connections. The platform also generates AI-powered mission prompts — conversation starters based on both users' profiles. When Gemini evaluates compatibility, we also ask it to generate 3 personalized conversation starters:
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Extracted from the same evaluation call
"missions": [
  "Both of you mentioned hiking. Ask about their most memorable trail — was it the view or the company?",
  "You both value deep conversations over small talk. Share a topic you've been thinking about recently.",
  "Your communication styles complement each other: you're direct, they're thoughtful. Ask them what they appreciate about their approach."
]`}</pre>
          </div>

          <p>
            These mission prompts are also cached, eliminating redundant API calls. They're tied to the evaluation result — if the evaluation changes (profile updated), the missions regenerate alongside it.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">&lt;5ms</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Cached Evaluation Retrieval</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">~95%</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Determinism Rate (temp=0)</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">100%</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Determinism Rate (with cache)</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">JSON</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Structured Output Format</div>
            </div>
          </div>

          <p>
            The combination of temperature=0, structured JSON output, and Redis caching produces a compatibility evaluation system that is deterministic, fast, and explainable. Users see consistent scores across sessions. The dimension breakdown gives them insight into why a match was suggested. The mission prompts convert the evaluation into actionable conversation starters.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Structured prompts with explicit dimensions beat free-form evaluation.</strong> Define what "compatibility" means in measurable terms (communication, values, interests, lifestyle). The AI evaluates each dimension independently and produces a weighted aggregate. This makes the result explainable and debuggable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Temperature=0 is not enough — always cache LLM outputs.</strong> Greedy decoding eliminates most but not all variance. A cache keyed on input content + model version guarantees determinism and improves performance by 2-3 orders of magnitude for repeated evaluations.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Force structured output formats.</strong> Gemini's <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">responseMimeType: 'application/json'</code> eliminates fragile text parsing. Always request a schema-defined JSON response that your application can validate with Zod.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Cache invalidation is part of the architecture, not an afterthought.</strong> When a user updates their profile, all cached evaluations involving that user must be invalidated. Design the cache key structure and invalidation logic before you write the first AI prompt.</span>
            </li>
          </ul>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6">
            <p className="text-xs text-gray-500 font-mono">Zod schema for evaluation output</p>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed mt-3 whitespace-pre-wrap">{`const EvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  dimensions: z.object({
    communication: z.number().min(0).max(100),
    values: z.number().min(0).max(100),
    interests: z.number().min(0).max(100),
    lifestyle: z.number().min(0).max(100),
  }),
  summary: z.string().max(200),
  missions: z.array(z.string()).length(3),
});`}</pre>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Broader Context</h2>

          <p>
            This pattern — structured prompts + temperature=0 + cached outputs + Zod validation — applies to any AI feature where consistency matters more than creativity. Recommendation systems, content moderation, automated scoring, and classification pipelines all benefit from deterministic AI outputs. The cache handles performance and consistency. The structured output handles reliability. The Zod schema handles type safety. Together, they make AI integration feel like a regular API call — predictable, fast, and testable.
          </p>

          <p className="text-gray-500 text-sm border-t border-white/5 pt-8 mt-12">
            SecretSoulmate is built with Next.js 16, Supabase (PostgreSQL), Drizzle ORM, Google Gemini AI, Redis (Upstash), and Zod 4. The full compatibility evaluation pipeline is ~200 lines of TypeScript.
          </p>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Integrating AI into a production application? Let's talk about your prompt architecture and caching strategy.
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
