import type { Metadata } from "next";
import { postMetadata } from "@/lib/seo";
import PostShell from "../PostShell";

export const metadata: Metadata = postMetadata("healchakra-row-level-locks");


export default function HealChakraPost() {
  return (
    <PostShell slug="healchakra-row-level-locks">

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Problem</h2>

          <p>
            HealChakra is a real-time mental wellness platform where users connect with therapists via video, voice, and chat. Every second of a session is billed from the user's wallet balance in real-time. The platform handles 500+ concurrent users with {'<'}150ms media latency.
          </p>

          <p>
            The wallet system needed to deduct the correct amount every time a session ended. Sounds simple. But here's the constraint: a user could have multiple browser tabs open, or the session end event could fire twice due to WebSocket reconnection. Each event would try to deduct from the same wallet balance simultaneously.
          </p>

          <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-5 my-8">
            <p className="text-sm text-red-300 font-medium mb-1">The race condition</p>
            <p className="text-sm text-mist leading-relaxed">
              Two requests read the wallet balance at the same time. Both see $50.00. Each deducts $5.00. Both write back $45.00. The user lost $5.00 but got charged $10.00. The first write overwrites the second. Double-charge.
            </p>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Why This Is Hard</h2>

          <p>
            The naive approach is to check the balance before deducting:
          </p>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6 overflow-x-auto">
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed whitespace-pre-wrap">{`// Step 1: Read balance
const balance = await db.query('SELECT balance FROM wallets WHERE id = $1', [walletId]);

// Step 2: Check if sufficient
if (balance < amount) throw new Error('Insufficient funds');

// Step 3: Deduct
await db.query('UPDATE wallets SET balance = balance - $1 WHERE id = $2', [amount, walletId]);`}</pre>
          </div>

          <p>
            This breaks under concurrency. Two requests can both pass Step 2 before either reaches Step 3. The UPDATE is atomic, but the read+check+write sequence is not. Between Step 1 and Step 3, another request can read the same stale balance.
          </p>

          <p>
            This is a classic <strong className="text-cream font-medium">read-modify-write</strong> race condition. It's the same class of bug that causes bank transfer failures and inventory overselling.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Solutions Considered</h2>

          <div className="space-y-4 my-6">
            <div className="bg-night-2/60 border border-line rounded-lg p-5">
              <p className="text-cream font-medium text-sm mb-1">1. Application-level mutex (Redis lock)</p>
              <p className="text-sm text-mist">Acquire a distributed lock before each wallet operation. Problem: locks add latency, require timeout handling, and the lock can fail (node crash, network partition) leaving the system in an inconsistent state.</p>
            </div>
            <div className="bg-night-2/60 border border-line rounded-lg p-5">
              <p className="text-cream font-medium text-sm mb-1">2. Optimistic locking (version column)</p>
              <p className="text-sm text-mist">Add a version column to the wallet. Read the version, attempt the UPDATE with <code className="text-mint bg-mint/10 px-1 rounded text-xs">WHERE version = read_version</code>, retry if no rows match. Problem: under high contention (multiple sessions from the same user), retries cause wasted work and unpredictable latency. A user with two active sessions would generate cascading retries.</p>
            </div>
            <div className="bg-mint/5 border border-mint/20 rounded-lg p-5">
              <p className="text-mint font-medium text-sm mb-1">3. PostgreSQL row-level lock (chosen)</p>
              <p className="text-sm text-mist">Lock the specific wallet row for the duration of the read+check+write sequence. No other transaction can read or write the locked row until the first transaction completes. This eliminates the race condition at the database level without application-level complexity.</p>
            </div>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Solution: SELECT ... FOR UPDATE</h2>

          <p>
            PostgreSQL's <code className="text-mint bg-mint/10 px-1.5 py-0.5 rounded text-sm">SELECT ... FOR UPDATE</code> locks the selected rows for the duration of the transaction. Any other transaction trying to <code className="text-mint bg-mint/10 px-1.5 py-0.5 rounded text-sm">SELECT ... FOR UPDATE</code> on the same row will block until the first transaction commits or rolls back.
          </p>

          <p>
            The implementation:
          </p>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6 overflow-x-auto">
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed whitespace-pre-wrap">{`async function deductWallet(walletId: string, amount: number) {
  // Start a transaction
  await db.query('BEGIN');

  try {
    // Lock the wallet row — no other transaction can touch it
    const { rows } = await db.query(
      'SELECT balance FROM wallets WHERE id = $1 FOR UPDATE',
      [walletId]
    );

    if (rows.length === 0) throw new Error('Wallet not found');

    const balance = rows[0].balance;
    if (balance < amount) throw new Error('Insufficient funds');

    // Deduct — safe because we hold the row lock
    await db.query(
      'UPDATE wallets SET balance = balance - $1 WHERE id = $2',
      [amount, walletId]
    );

    // Record the transaction
    await db.query(
      \`INSERT INTO wallet_transactions (wallet_id, amount, type)
       VALUES ($1, $2, 'debit')\`,
      [walletId, amount]
    );

    // Release the lock
    await db.query('COMMIT');

    return { success: true, remaining: balance - amount };
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}`}</pre>
          </div>

          <div className="bg-amber/5 border border-amber/20 rounded-lg p-5 my-6">
            <p className="text-sm text-amber font-medium mb-1">Idempotency key — the real safeguard</p>
            <p className="text-sm text-mist leading-relaxed">
              Row-level locks prevent concurrent double-deductions. But what if the same session-end event is delivered twice (e.g., WebSocket reconnection, retry logic)? We added a unique constraint on <code className="text-amber bg-amber/10 px-1 rounded text-xs">(session_id, event_id)</code> in the transactions table. The second INSERT fails, the transaction rolls back, and the caller gets a duplicate error — not a double charge. The lock + idempotency key together provide a complete safety net.
            </p>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Why Not Optimistic Locking?</h2>

          <p>
            Optimistic locking works well for low-contention scenarios. But in HealChakra, a single user's wallet is accessed every time a session ends. If a user has multiple concurrent sessions (or session-end retries), contention on that wallet row is high. With optimistic locking, every retry means a wasted database round-trip and a delayed response to the client. Under load, this cascades — retries generate more load, which generates more retries.
          </p>

          <p>
            <strong className="text-cream font-medium">Row-level locks are pessimistic</strong> — they serialize access to the critical section. This is the right trade-off when the critical section is fast (a single row read + single row write) and contention is moderate to high. The lock is held for milliseconds. The throughput cost is negligible compared to the correctness guarantee.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-night-2/60 border border-line rounded-lg p-5 text-center">
              <div className="font-serif text-3xl text-cream">0</div>
              <div className="text-xs text-mist font-mono mt-1">Double-Charge Failures</div>
            </div>
            <div className="bg-night-2/60 border border-line rounded-lg p-5 text-center">
              <div className="font-serif text-3xl text-cream">&lt;5ms</div>
              <div className="text-xs text-mist font-mono mt-1">Lock Held Duration</div>
            </div>
            <div className="bg-night-2/60 border border-line rounded-lg p-5 text-center">
              <div className="font-serif text-3xl text-cream">500+</div>
              <div className="text-xs text-mist font-mono mt-1">Concurrent Users</div>
            </div>
            <div className="bg-night-2/60 border border-line rounded-lg p-5 text-center">
              <div className="font-serif text-3xl text-cream">38%</div>
              <div className="text-xs text-mist font-mono mt-1">P95 Query Reduction</div>
            </div>
          </div>

          <p>
            The system has processed thousands of wallet transactions without a single double-charge incident. The row-level lock approach was deployed in production alongside the idempotency key and has required zero incident responses related to payment integrity.
          </p>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Row-level locks are not a performance anti-pattern</strong> when the critical section is fast. A single-row lock held for milliseconds under moderate contention is negligible overhead.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Idempotency keys are an essential complement</strong> — locks prevent concurrent races, but unique constraints prevent duplicate events. You need both.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Start the transaction, lock the row, do the work, commit.</strong> Holding a lock while making external API calls (e.g., sending a push notification) increases lock duration and defeats the purpose.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-mint mt-1.5 text-sm">▹</span>
              <span className="text-sm text-cream/85"><strong className="text-cream font-medium">Always have a deadlock detection strategy.</strong> PostgreSQL detects deadlocks automatically and aborts one transaction. The application must retry on deadlock errors.</span>
            </li>
          </ul>

          <div className="bg-[#070b16] border border-line rounded-lg p-5 my-6">
            <p className="text-xs text-mist font-mono">PostgreSQL deadlock retry pattern</p>
            <pre className="text-[13px] text-cream/90 font-mono leading-relaxed mt-3 whitespace-pre-wrap">{`try {
  await deductWallet(walletId, amount);
} catch (error) {
  // 40P01 is PostgreSQL's deadlock detection code
  if (error.code === '40P01') {
    // Retry the entire transaction
    return deductWallet(walletId, amount);
  }
  throw error;
}`}</pre>
          </div>

          <h2 className="font-serif font-normal text-cream text-2xl md:text-3xl tracking-tight !mt-14 mb-4">The Broader Context</h2>

          <p>
            This pattern applies anywhere you have a financial transaction with a read-modify-write cycle: wallet systems, inventory management, booking systems, and any "check then decrement" operation. PostgreSQL row-level locks are a reliable, proven tool for this class of problems — no distributed lock manager, no external service dependency, just the database you already have.
          </p>

          <p className="text-mist text-sm border-t border-line pt-8 mt-12">
            HealChakra is built with Next.js 16, LiveKit WebRTC, Supabase (PostgreSQL), and Zod 4. The full source code and architecture documentation are available on GitHub. This post covers one specific subsystem — the wallet and billing engine — in depth.
          </p>

                    <div className="mt-14 rounded-lg border border-line bg-night-2/60 p-6 text-center">
            <p className="text-mist text-sm mb-6">
              Have a similar engineering challenge? Let's talk about your system's architecture.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 text-sm font-medium text-night hover:bg-cream transition-colors"
            >
              Start a Conversation →
            </a>
          </div>
    </PostShell>
  );
}
