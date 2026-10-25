import type { Metadata } from "next";
import PostShell from "../PostShell";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Handling High-Concurrency Presence and Real-Time Matching on a Social Web Platform",
  description: "How Fantasy keeps thousands of active users, chat states, and daily login streaks perfectly synchronized without collapsing under load.",
  alternates: { canonical: "/writing/fantasy-high-concurrency-presence" },
};


export default function FantasyPresencePost() {
  return (
    <PostShell slug="fantasy-high-concurrency-presence">

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Problem With "Active Users"</h2>

          <p>
            Most web apps treat user presence as an afterthought. You store a <code className="text-mint bg-mint/10 px-1.5 py-0.5 rounded text-sm">last_seen</code> timestamp, check if it's within the last 5 minutes, and call it a day.
          </p>

          <p>
            That breaks down the moment your platform is social. On Fantasy, a matching and creator platform, users need to know who is online <em>right now</em>. Not 5 minutes ago. Right now. Because the matching engine prioritizes active users, and if you show someone a match who logged off 3 minutes ago, you've wasted their attention and eroded trust in the platform.
          </p>

          <p>
            On top of that, we had daily login streaks. If a user's streak counter increments twice because of a race condition during midnight rollover, or doesn't increment because the Realtime channel dropped, you have a frustrated user filing a bug report.
          </p>

          <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-5 my-8">
            <p className="text-sm text-red-300 font-medium mb-1">The real constraint</p>
            <p className="text-sm text-mist leading-relaxed">
              Presence, matching, chat, and streak tracking all happen concurrently. A single user action (opening the app) triggers 4 different real-time systems simultaneously. If any of them lag, the entire experience feels broken.
            </p>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Ephemeral vs. Persistent State</h2>

          <p>
            The first design decision was separating what needs to survive a server restart from what doesn't. Presence (who's online) is ephemeral — if the server reboots, everyone reconnects and re-announces themselves. Login streaks and match history are persistent — they live in PostgreSQL.
          </p>

          <p>
            I used Supabase Realtime channels for the ephemeral layer. Each user joins a presence channel on app load. Supabase tracks joins and leaves automatically via WebSocket heartbeats. When a user closes their tab or loses connection, the leave event fires within seconds.
          </p>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6 overflow-x-auto">
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed whitespace-pre-wrap">{`// Presence channel setup
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

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Streak Logic That Doesn't Break at Midnight</h2>

          <p>
            Login streaks sound trivial until you think about timezones and race conditions. A user in IST logs in at 11:58 PM. The streak check runs. Then they navigate to another page at 12:01 AM. The page triggers another check. If both checks hit the database concurrently, you can get a double increment.
          </p>

          <p>
            I handled this with a PostgreSQL function that uses <code className="text-mint bg-mint/10 px-1.5 py-0.5 rounded text-sm">SELECT ... FOR UPDATE</code> on the user's streak row. The function atomically checks the last login date, compares it to the current UTC date, and either increments the streak, resets it, or does nothing — all within a single transaction. No application-level logic can cause a double increment because the row is locked for the duration of the check.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Chat That Doesn't Poll</h2>

          <p>
            The chat system runs on a separate Supabase Realtime channel per conversation. When User A sends a message, it's inserted into PostgreSQL. The Realtime subscription on User B's client picks it up within milliseconds. No polling interval. No stale messages.
          </p>

          <p>
            Typing indicators use the presence channel, not the database. When User A starts typing, their client updates the presence metadata with <code className="text-mint bg-mint/10 px-1.5 py-0.5 rounded text-sm">{'{ typing: true }'}</code>. User B's client sees the presence sync event and shows the indicator. When User A stops typing (debounced at 2 seconds), the metadata clears. This means typing indicators have zero database writes — they're entirely in-memory on Supabase's presence infrastructure.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Separate ephemeral from persistent state early.</strong> Presence, typing indicators, and active status are ephemeral. Streaks, matches, and messages are persistent. Mixing them in the same storage layer causes unnecessary complexity.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Use database locks for anything involving counters.</strong> Application-level "check then update" logic will always have a race window. PostgreSQL row-level locks eliminate it entirely.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Typing indicators don't belong in your database.</strong> Ephemeral UI signals should use presence channels, not persistent storage. Zero writes, instant propagation.</span>
            </li>
          </ul>

          <div className="mt-14 rounded-lg border border-line bg-night-2/60 p-6 text-center">
            <p className="text-mist text-sm mb-6">
              Building a high-concurrency web platform? I can help with the architecture.
            </p>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              Let's Talk →
            </Link>
          </div>
    </PostShell>
  );
}
