import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 py-16 border-t border-white/10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Let&apos;s Build Something Great</h2>
      <div className="flex justify-center gap-8 mb-8">
        <a href="mailto:softjitsingh@gmail.com" className="p-4 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 transition-all"><FaEnvelope size={24} /></a>
        <a href="https://linkedin.com/in/softjit-singh" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 transition-all"><FaLinkedin size={24} /></a>
        <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 transition-all"><FaGithub size={24} /></a>
      </div>
      <p className="text-gray-600 text-sm">© 2026 Softjit Singh. All rights reserved.</p>
    </footer>
  );
}