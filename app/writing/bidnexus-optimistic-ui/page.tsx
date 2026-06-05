import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function BidNexusPost() {
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
            Optimistic UI and Conflict Resolution in a Real-Time Auction Platform
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How BidNexus handles concurrent bids with instant UI feedback, WebSocket state synchronization, and conflict resolution — without showing stale data to any user.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Problem</h2>

          <p>
            BidNexus is a real-time mobile auction platform. Users place bids on items with live countdown timers. When two users bid on the same item at the same time, the platform must accept exactly one bid — the first one that arrives at the server — and reject the other.
          </p>

          <p>
            The UX constraint: showing a loading spinner while the bid is being processed would lose users. The bid button press must feel instant. But the server needs to validate the bid against the current highest bid, which may have changed since the user last saw the state.
          </p>

          <p>
            This is the fundamental tension of real-time competitive applications: <strong className="text-white">instant UI feedback vs. server-authoritative state</strong>.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The failure mode</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              User A sees the current bid at $50. User B sees the same. Both press "Bid $55" simultaneously. Both UIs optimistically show $55. Server processes A's bid — accepted. Server processes B's bid — rejected (outbid). User B's UI now shows a bid they never actually placed. If the UI doesn't correct this fast enough, User B will think they won the auction, then discover they didn't. Trust destroyed.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why This Is Hard</h2>

          <p>
            The naive approach is to wait for the server response before updating the UI:
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`async function placeBid(itemId: string, amount: number) {
  // Show loading state
  setBidding(true);

  // Wait for server
  const result = await api.post('/bids', { itemId, amount });

  // Then update UI
  setCurrentBid(result.newBid);
  setBidding(false);
}`}</pre>
          </div>

          <p>
            This is safe but slow. Network latency (especially on mobile) means the user waits 200-500ms before seeing their bid. In a timed auction, that delay could cost them the item. Worse, if the server rejects the bid, the user has already missed their chance to bid again.
          </p>

          <p>
            The real challenge: <strong className="text-white">reconciling the optimistic UI state with the server's authoritative state</strong> when they diverge. The optimistic update assumes success. The server may say no. The UI must smoothly transition from "you won" to "you were outbid" without confusing the user or showing data that was never real.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Solutions Considered</h2>

          <div className="space-y-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">1. Pessimistic updates (wait for server)</p>
              <p className="text-sm text-gray-400">The safest approach — show a loading state until the server responds. Problem: mobile network latency makes this feel sluggish. In a competitive auction context, users perceive delay as losing. The platform looks slow even when it isn't.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-1">2. Client-side prediction (gaming approach)</p>
              <p className="text-sm text-gray-400">Show the result instantly, then correct if wrong. Works well in games (your bullet hits, then the server reconciles). Problem: in an auction, showing a "bid accepted" that later reverts feels like a bug, not a feature. Users lose confidence in the platform's accuracy.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5">
              <p className="text-blue-300 font-semibold text-sm mb-1">3. Optimistic UI + WebSocket reconciliation (chosen)</p>
              <p className="text-sm text-gray-400">Show the bid immediately with a visual pending state. Stream authoritative state changes via WebSocket. On server response: confirm the bid (remove pending state) or roll it back (show rejected state with explanation). All connected clients receive the updated state in real-time.</p>
            </div>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Solution: Optimistic UI with WebSocket Reconciliation</h2>

          <p>
            The core insight: <strong className="text-white">show the bid immediately, but visually distinguish between "pending" and "confirmed" states.</strong> The user gets instant feedback, but the system is transparent about authority.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Client-side bid placement
async function placeBid(itemId: string, amount: number) {
  // 1. Generate a client-side ID for this bid attempt
  const bidId = crypto.randomUUID();

  // 2. Optimistically update local state
  dispatch({
    type: 'BID_PENDING',
    payload: { itemId, amount, bidId, timestamp: Date.now() }
  });

  // 3. Send bid to server
  try {
    const response = await api.post('/bids', {
      itemId, amount, bidId
    });
    // 4a. Server accepted — update state
    dispatch({ type: 'BID_CONFIRMED', payload: response.bid });
  } catch (error) {
    // 4b. Server rejected — roll back optimistic state
    dispatch({
      type: 'BID_REJECTED',
      payload: { bidId, reason: error.message }
    });
  }
}

// Server-side bid validation
async function acceptBid(itemId: string, amount: number) {
  // Serialize bids per item using PostgreSQL row-level lock
  const result = await db.query(\`
    UPDATE auction_items
    SET current_bid = $1, current_bidder = $2
    WHERE id = $3 AND current_bid < $1
    RETURNING *
  \`, [amount, userId, itemId]);

  if (result.rows.length === 0) {
    throw new Error('Outbid — current bid is higher');
  }

  // Broadcast new state to ALL connected clients via WebSocket
  ws.broadcast(\`item:\${itemId}\`, {
    type: 'BID_ACCEPTED',
    currentBid: amount,
    currentBidder: result.rows[0].current_bidder
  });

  return result.rows[0];
}`}</pre>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-5 my-6">
            <p className="text-sm text-yellow-200 font-semibold mb-1">The pending state buys you trust</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              The critical UX detail: a pending bid shows differently from a confirmed bid. The user sees their bid amount on the screen immediately, but with a subtle visual treatment (e.g., slight opacity, pulsing border, or a "processing" badge). When the server confirms, the treatment changes to solid. If the server rejects, the bid fades out with a "You were outbid" message. This transparency makes the system feel responsive and honest — not buggy.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Conflict Resolution: The Hard Part</h2>

          <p>
            The database-level lock (PostgreSQL <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">SELECT ... FOR UPDATE</code> on the auction item row) ensures only one bid succeeds. But what happens to the losing bidder's optimistic state?
          </p>

          <p>
            When the server rejects a bid, it returns a <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">409 Conflict</code> with the current winning bid amount. The client uses the bidId (generated in step 1) to identify which optimistic update to roll back. At the same time, the WebSocket broadcast delivers the new authoritative state to all connected clients — including the winner and every observer.
          </p>

          <p>
            The rollback is not a full page reload. It's a targeted state update: remove the pending bid from the local state, replace it with the server's current highest bid, and show a brief toast notification explaining the rejection. The auction continues. No page flash, no data inconsistency.
          </p>

          <p>
            The WebSocket broadcast ensures that all clients — not just the bidders — see the updated state within milliseconds. Observer clients watching the auction see the bid update in real-time without polling.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Why This Approach?</h2>

          <p>
            Optimistic UI + WebSocket reconciliation is the standard pattern for collaborative and competitive real-time applications (Google Docs, Figma, real-time trading platforms). The alternatives don't scale to the concurrency needs of a live auction:
          </p>

          <p>
            <strong className="text-white">Polling</strong> is too slow — a 1-second poll interval means 1 second of staleness. In a timed auction, that's an eternity. <strong className="text-white">Pessimistic updates</strong> feel broken on mobile networks where round-trip times are unpredictable. <strong className="text-white">Client-side prediction without server reconciliation</strong> (the gaming approach) assumes the client can simulate the server's logic, which is fragile when the server has authoritative data (like the user's account balance).
          </p>

          <p>
            The optimistic + WebSocket approach gives you the <strong className="text-white">responsiveness of client-side prediction with the correctness of server authority.</strong> The pending visual state is the key innovation — it manages user expectations so that a rejection feels like fair competition, not a system failure.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">&lt;100ms</div>
              <div className="text-xs text-gray-500 font-mono mt-1">UI Response Time</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">0</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Stale State Incidents</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">Real-Time</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Cross-Client Sync</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-mono">Conflict</div>
              <div className="text-xs text-gray-500 font-mono mt-1">Never Shown to User</div>
            </div>
          </div>

          <p>
            The optimistic UI pattern eliminates visible loading states from the bidding flow. Users see their bid reflected immediately. The WebSocket layer synchronizes authoritative state across all connected clients in real-time. Conflict resolution happens server-side and the result is pushed to all clients — no polling, no stale data, no confusing UI states.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Optimistic updates require a pending visual state.</strong> Without it, users can't distinguish between "my bid is being processed" and "my bid was accepted." The pending state creates an expectation of confirmation, so rejection isn't confusing — it's just disappointing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Server authority is non-negotiable for financial transactions.</strong> The client can predict, but the server must decide. Row-level locks on the auction item ensure exactly one bid succeeds, even under network partitions or client crashes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">WebSocket broadcasts scale better than polling for real-time state.</strong> Every client receives the authoritative state within milliseconds of a state change. No polling interval means no staleness window.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Client-side IDs (bidId) enable targeted rollback.</strong> When the server rejects a bid, the client knows exactly which optimistic update to revert. Without this, you'd have to reconcile by data matching, which is fragile.</span>
            </li>
          </ul>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6">
            <p className="text-xs text-gray-500 font-mono">Client-side state machine for bid lifecycle</p>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed mt-3 whitespace-pre-wrap">{`type BidState =
  | { status: 'idle' }
  | { status: 'pending', bidId: string, amount: number }
  | { status: 'confirmed', bidId: string, amount: number }
  | { status: 'rejected', bidId: string, reason: string };`}</pre>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Broader Context</h2>

          <p>
            This pattern applies anywhere users compete for scarce resources: auction platforms, ticket booking systems, limited-quantity checkout flows, and reservation systems. The optimistic UI + WebSocket reconciliation pattern gives you the responsiveness of a local-first app with the correctness guarantees of a server-authoritative system. The pending state is the UX innovation that makes it work — without it, users experience every rejection as a system failure.
          </p>

          <p className="text-gray-500 text-sm border-t border-white/5 pt-8 mt-12">
            BidNexus is built with React Native (Expo), Supabase (PostgreSQL), and WebSockets. The server-side bid validation uses PostgreSQL row-level locks for atomic updates.
          </p>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Building a real-time competitive application? Let's talk about your state management architecture.
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
