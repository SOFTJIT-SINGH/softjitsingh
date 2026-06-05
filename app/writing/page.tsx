import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { writingPosts } from "@/lib/writing";

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">Writing</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-xl">
          Technical deep-dives on production engineering decisions, database architectures, and concurrency patterns.
        </p>

        <div className="space-y-8">
          {writingPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-xl p-6 md:p-8 transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <FaArrowRight size={16} className="text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
