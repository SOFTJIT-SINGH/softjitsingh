import type { Metadata } from "next";
import { postMetadata } from "@/lib/seo";
import PostShell from "../PostShell";
import Link from "next/link";

export const metadata: Metadata = postMetadata("routesync-offline-first-sync");


export default function RouteSyncPost() {
  return (
    <PostShell slug="routesync-offline-first-sync">

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Split-Brain Problem</h2>

          <p>
            When traveling in a group, network connectivity is the enemy. You are in a subway, your friend is in a tunnel, and another is on a flaky 3G connection in a remote area. If two people update the group's travel itinerary simultaneously while offline, whose changes win when connectivity returns?
          </p>

          <p>
            In RouteSync, a cross-platform mobile travel companion, the naive approach of "last write wins" based on server arrival time creates a frustrating user experience. It leads to silently overwritten data and desynced group states.
          </p>

          <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-5 my-8">
            <p className="text-sm text-red-300 font-medium mb-1">The Failure State</p>
            <p className="text-sm text-mist leading-relaxed">
              If User A and User B both edit the itinerary while offline, traditional REST architectures will accept whichever payload reaches the database last once they reconnect. This destroys data integrity and trust in the application.
            </p>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Optimistic UI vs Server Truth</h2>

          <p>
            To provide a fluid UX, mobile apps must employ <strong className="text-cream font-medium">optimistic UI updates</strong>. When a user adds a waypoint, the UI must reflect the change instantly, even without an internet connection.
          </p>
          
          <p>
            However, this local state must eventually reconcile with the server. I engineered an offline-first state synchronization engine using Supabase Realtime and local SQLite caching.
          </p>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6 overflow-x-auto">
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed whitespace-pre-wrap">{`// Handling offline-first writes with local queueing
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

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Conflict Resolution and Tenant Isolation</h2>

          <p>
            When connectivity returns, the background sync worker drains the local SQLite queue and pushes mutations to PostgreSQL via Supabase. To handle conflicts, I implemented a versioned schema approach using atomic operations.
          </p>

          <p>
            Instead of standard updates, every mutation includes the client's known `version_id` of the itinerary. If the server's version is newer, the PostgreSQL transaction aborts, triggering a client-side merge resolution. This guarantees that concurrent updates are handled deterministically without data loss.
          </p>

          <p>
            Crucially, all operations are bound by PostgreSQL Row-Level Security (RLS) to enforce strict <strong className="text-cream font-medium">tenant data isolation</strong>. A user can only read or mutate itineraries their specific travel group owns, down to the database row level.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Assume the network will fail.</strong> Offline-first is not a feature; it is an architectural requirement for mobile applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Separate local state from server truth.</strong> Use a local queue (like SQLite or WatermelonDB) to buffer mutations until network conditions are favorable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Atomic operations prevent split-brains.</strong> Use versioning and atomic database transactions to ensure concurrent edits are resolved gracefully.</span>
            </li>
          </ul>

          <div className="mt-14 rounded-lg border border-line bg-night-2/60 p-6 text-center">
            <p className="text-mist text-sm mb-6">
              Struggling with complex mobile state synchronization?
            </p>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              Let's Talk Architecture →
            </Link>
          </div>
    </PostShell>
  );
}
