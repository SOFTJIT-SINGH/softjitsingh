import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Handling High-Concurrency Presence and Real-Time Matching on a Social Web Platform",
  description: "How Fantasy keeps thousands of active users, chat states, and daily login streaks perfectly synchronized without collapsing under load.",
  alternates: { canonical: "/writing/fantasy-high-concurrency-presence" },
};


export default function FantasyPresencePost() {
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
            Handling High-Concurrency Presence and Real-Time Matching on a Social Web Platform
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How Fantasy keeps thousands of active users, chat states, and daily login streaks perfectly synchronized without collapsing under load.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Problem With "Active Users"</h2>

          <p>
            Most web apps treat user presence as an afterthought. You store a <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">last_seen</code> timestamp, check if it's within the last 5 minutes, and call it a day.
          </p>

          <p>
            That breaks down the moment your platform is social. On Fantasy, a matching and creator platform, users need to know who is online <em>right now</em>. Not 5 minutes ago. Right now. Because the matching engine prioritizes active users, and if you show someone a match who logged off 3 minutes ago, you've wasted their attention and eroded trust in the platform.
          </p>

          <p>
            On top of that, we had daily login streaks. If a user's streak counter increments twice because of a race condition during midnight rollover, or doesn't increment because the Realtime channel dropped, you have a frustrated user filing a bug report.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The real constraint</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Presence, matching, chat, and streak tracking all happen concurrently. A single user action (opening the app) triggers 4 different real-time systems simultaneously. If any of them lag, the entire experience feels broken.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Ephemeral vs. Persistent State</h2>

          <p>
            The first design decision was separating what needs to survive a server restart from what doesn't. Presence (who's online) is ephemeral — if the server reboots, everyone reconnects and re-announces themselves. Login streaks and match history are persistent — they live in PostgreSQL.
          </p>

          <p>
            I used Supabase Realtime channels for the ephemeral layer. Each user joins a presence channel on app load. Supabase tracks joins and leaves automatically via WebSocket heartbeats. When a user closes their tab or loses connection, the leave event fires within seconds.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Presence channel setup
const presenceChannel = supabase.channel('online_users');

presenceChannel
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState();
    // state contains all currently online users
    setOnlineUsers(Object.keys(state));
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    // A user just came online — update matching pool
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    // A user went offline — remove from active matching
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceChannel.track({ user_id: session.user.id });
    }
  });`}</pre>
          </div>

          <p>
            The matching engine subscribes to these presence events. When it runs the discovery query, it filters against the live presence state, not a stale database timestamp. The result: users only see matches who are genuinely active.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Streak Logic That Doesn't Break at Midnight</h2>

          <p>
            Login streaks sound trivial until you think about timezones and race conditions. A user in IST logs in at 11:58 PM. The streak check runs. Then they navigate to another page at 12:01 AM. The page triggers another check. If both checks hit the database concurrently, you can get a double increment.
          </p>

          <p>
            I handled this with a PostgreSQL function that uses <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">SELECT ... FOR UPDATE</code> on the user's streak row. The function atomically checks the last login date, compares it to the current UTC date, and either increments the streak, resets it, or does nothing — all within a single transaction. No application-level logic can cause a double increment because the row is locked for the duration of the check.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Chat That Doesn't Poll</h2>

          <p>
            The chat system runs on a separate Supabase Realtime channel per conversation. When User A sends a message, it's inserted into PostgreSQL. The Realtime subscription on User B's client picks it up within milliseconds. No polling interval. No stale messages.
          </p>

          <p>
            Typing indicators use the presence channel, not the database. When User A starts typing, their client updates the presence metadata with <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">{'{ typing: true }'}</code>. User B's client sees the presence sync event and shows the indicator. When User A stops typing (debounced at 2 seconds), the metadata clears. This means typing indicators have zero database writes — they're entirely in-memory on Supabase's presence infrastructure.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Separate ephemeral from persistent state early.</strong> Presence, typing indicators, and active status are ephemeral. Streaks, matches, and messages are persistent. Mixing them in the same storage layer causes unnecessary complexity.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Use database locks for anything involving counters.</strong> Application-level "check then update" logic will always have a race window. PostgreSQL row-level locks eliminate it entirely.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Typing indicators don't belong in your database.</strong> Ephemeral UI signals should use presence channels, not persistent storage. Zero writes, instant propagation.</span>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Building a high-concurrency web platform? I can help with the architecture.
            </p>
            <Link
              href="/hire"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Let's Talk →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
