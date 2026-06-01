import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] py-24 border-t border-white/5 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-light mb-12 text-white tracking-tight">Let&apos;s Build Something Great</h2>
        <div className="flex justify-center gap-12 mb-16">
          <a href="mailto:softjitsingh@gmail.com" className="text-gray-500 hover:text-white transition-colors"><FaEnvelope size={20} /></a>
          <a href="https://linkedin.com/in/softjit-singh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><FaLinkedin size={20} /></a>
          <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><FaGithub size={20} /></a>
        </div>
        <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">© 2026 Softjit Singh. All rights reserved.</p>
      </div>
    </footer>
  );
}