import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Mastering Offline-First State Synchronization for Concurrent Group Travel",
  description: "How I solved the split-brain problem in RouteSync using optimistic UI updates and Supabase Realtime conflict resolution.",
  alternates: { canonical: "/writing/routesync-offline-first-sync" },
};


export default function RouteSyncPost() {
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
            <span>5 min read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
            Mastering Offline-First State Synchronization for Concurrent Group Travel
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How I solved the split-brain problem in RouteSync using optimistic UI updates and Supabase Realtime conflict resolution.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Split-Brain Problem</h2>

          <p>
            When traveling in a group, network connectivity is the enemy. You are in a subway, your friend is in a tunnel, and another is on a flaky 3G connection in a remote area. If two people update the group's travel itinerary simultaneously while offline, whose changes win when connectivity returns?
          </p>

          <p>
            In RouteSync, a cross-platform mobile travel companion, the naive approach of "last write wins" based on server arrival time creates a frustrating user experience. It leads to silently overwritten data and desynced group states.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The Failure State</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              If User A and User B both edit the itinerary while offline, traditional REST architectures will accept whichever payload reaches the database last once they reconnect. This destroys data integrity and trust in the application.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Optimistic UI vs Server Truth</h2>

          <p>
            To provide a fluid UX, mobile apps must employ <strong className="text-white">optimistic UI updates</strong>. When a user adds a waypoint, the UI must reflect the change instantly, even without an internet connection.
          </p>
          
          <p>
            However, this local state must eventually reconcile with the server. I engineered an offline-first state synchronization engine using Supabase Realtime and local SQLite caching.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Handling offline-first writes with local queueing
async function addWaypoint(itineraryId: string, waypoint: Waypoint) {
  // 1. Optimistic local state update
  dispatch({ type: 'ADD_WAYPOINT', payload: waypoint });
  
  // 2. Write to local SQLite queue
  await LocalDatabase.insert('sync_queue', {
    action: 'ADD_WAYPOINT',
    payload: waypoint,
    timestamp: Date.now(),
    status: 'pending'
  });

  // 3. Attempt network sync if online
  if (networkStatus.isConnected) {
    triggerBackgroundSync();
  }
}`}</pre>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Conflict Resolution and Tenant Isolation</h2>

          <p>
            When connectivity returns, the background sync worker drains the local SQLite queue and pushes mutations to PostgreSQL via Supabase. To handle conflicts, I implemented a versioned schema approach using atomic operations.
          </p>

          <p>
            Instead of standard updates, every mutation includes the client's known `version_id` of the itinerary. If the server's version is newer, the PostgreSQL transaction aborts, triggering a client-side merge resolution. This guarantees that concurrent updates are handled deterministically without data loss.
          </p>

          <p>
            Crucially, all operations are bound by PostgreSQL Row-Level Security (RLS) to enforce strict <strong className="text-white">tenant data isolation</strong>. A user can only read or mutate itineraries their specific travel group owns, down to the database row level.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Assume the network will fail.</strong> Offline-first is not a feature; it is an architectural requirement for mobile applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Separate local state from server truth.</strong> Use a local queue (like SQLite or WatermelonDB) to buffer mutations until network conditions are favorable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Atomic operations prevent split-brains.</strong> Use versioning and atomic database transactions to ensure concurrent edits are resolved gracefully.</span>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Struggling with complex mobile state synchronization?
            </p>
            <Link
              href="/hire"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Let's Talk Architecture →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
