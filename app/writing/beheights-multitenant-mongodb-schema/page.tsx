import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Designing Flexible Multi-Tenant MongoDB Schemas for Institutional SaaS",
  description: "How BeHeights models wildly different administrative workflows across tenants without separate databases or endless migration scripts.",
  alternates: { canonical: "/writing/beheights-multitenant-mongodb-schema" },
};


export default function BeHeightsPost() {
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
            Designing Flexible Multi-Tenant MongoDB Schemas for Institutional SaaS
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            How BeHeights models wildly different administrative workflows across tenants without separate databases or endless migration scripts.
          </p>
        </header>

        <div className="w-full h-px bg-white/5 mb-12"></div>

        <div className="prose-custom space-y-6 text-gray-300 text-[15px] leading-[1.8]">

          <h2 className="text-white font-bold text-lg mt-10 mb-4">The Schema Problem Nobody Warns You About</h2>

          <p>
            BeHeights is an institutional management dashboard. It handles library tracking, resource issuance, staff management, and reporting for educational institutions. The catch: every institution runs slightly differently.
          </p>

          <p>
            Institution A tracks books by ISBN and issues them to students with a 14-day return window. Institution B tracks lab equipment by serial number and issues it to faculty with no return deadline. Institution C tracks sports gear and needs damage reporting on return. Same core concept — "issue a resource to a person" — but the data shape, validation rules, and workflow differ for each.
          </p>

          <p>
            With PostgreSQL, you'd either design a rigid schema that forces everyone into the same model, or you'd end up writing migrations every time you onboard a new institution. Neither scales.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 my-8">
            <p className="text-sm text-red-200 font-semibold mb-1">The multi-tenant trap</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Running a separate database per institution is operationally expensive and wasteful. But cramming all tenants into a rigid shared schema means every new institution requires schema changes that affect everyone. You need a middle ground.
            </p>
          </div>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">MongoDB's Flexibility as an Advantage</h2>

          <p>
            I chose MongoDB specifically because its document model handles schema variance naturally. A "resource" document for Institution A has different fields than Institution B, and that's fine — they coexist in the same collection.
          </p>

          <p>
            The core document structure has a fixed skeleton that all tenants share (tenant ID, resource type, status, assigned user, timestamps), plus a flexible <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">metadata</code> subdocument where tenant-specific fields live.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-5 my-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">{`// Fixed skeleton + flexible metadata
{
  tenantId: "inst_A",
  resourceType: "book",
  status: "issued",
  assignedTo: "student_123",
  issuedAt: ISODate("2026-08-15"),
  dueDate: ISODate("2026-08-29"),
  metadata: {
    isbn: "978-3-16-148410-0",
    title: "Data Structures in C",
    shelf: "B-14",
    condition: "good"
  }
}

// Same collection, different tenant, different shape
{
  tenantId: "inst_B",
  resourceType: "lab_equipment",
  status: "issued",
  assignedTo: "faculty_456",
  issuedAt: ISODate("2026-08-10"),
  dueDate: null,  // no return deadline for this tenant
  metadata: {
    serialNumber: "OSC-2024-0891",
    labRoom: "Physics Lab 3",
    calibrationDate: ISODate("2026-06-01")
  }
}`}</pre>
          </div>

          <p>
            The fixed fields are indexed and queried uniformly. The metadata fields are tenant-specific and only accessed when rendering that tenant's UI. This means I can run aggregation queries across all tenants (e.g., "how many resources are currently issued?") without caring about the metadata shape, while each tenant's dashboard shows their specific fields.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Multi-Role Access Control with NextAuth.js</h2>

          <p>
            Each institution has its own admin hierarchy. A librarian can issue and return books but can't modify staff records. A department head can view reports for their department but not for other departments. The super admin sees everything.
          </p>

          <p>
            I built this with NextAuth.js sessions carrying a role claim. The role is set during authentication based on the user's record in MongoDB. Every API route checks the role before executing. This isn't per-route if/else logic — it's a centralized middleware that reads a permission matrix and rejects unauthorized requests before the route handler even runs.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">When NOT to Use This Pattern</h2>

          <p>
            This approach works well when tenants share the same core workflow (issue/return resources) with different data shapes. It breaks down when tenants need fundamentally different business logic — like if one tenant needs an approval workflow and another doesn't. At that point, you're no longer varying data; you're varying behavior, and that requires a plugin architecture, not flexible schemas.
          </p>

          <p>
            For BeHeights, the variance was in data shape, not business logic. Every tenant issues resources and tracks returns. The fields differ, the workflow doesn't. That's the sweet spot for flexible document schemas.
          </p>

          <h2 className="text-white font-bold text-lg mt-10 mb-4">Key Takeaways</h2>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Use a fixed skeleton with flexible metadata.</strong> Index and query the fixed fields. Let the metadata subdocument absorb per-tenant variance without schema changes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Centralize RBAC, don't scatter it.</strong> A permission matrix checked by middleware is auditable and consistent. Per-route auth checks are a vulnerability waiting to happen.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 text-sm">▹</span>
              <span className="text-sm text-gray-300"><strong className="text-white">Know when document flexibility stops helping.</strong> Flexible schemas handle data variance. For behavior variance, you need a different architectural pattern entirely.</span>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm mb-6">
              Building a multi-tenant SaaS platform? I can help design the schema and access control.
            </p>
            <Link
              href="/hire"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
            >
              Let's Design It →
            </Link>
          </div>

        </div>
      </article>
    </div>
  );
}
