'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaPalette, 
  FaTools, 
  FaGraduationCap,
  FaTrophy,
  FaExternalLinkAlt,
  FaGithub,
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaNodeJs,
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiTensorflow,
  SiShopify,
  SiVercel
} from 'react-icons/si'

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('languages')

  const skills = {
    languages: [
      { name: 'Python', icon: <FaPython className="text-blue-400" /> },
      { name: 'Java', icon: <FaJava className="text-red-400" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
      { name: 'C++', icon: <FaCode className="text-purple-400" /> },
      { name: 'SQL', icon: <FaDatabase className="text-teal-400" /> },
      { name: 'PHP', icon: <FaServer className="text-indigo-400" /> }
    ],
    frontend: [
      { name: 'Next.js 15', icon: <SiNextdotjs className="text-white" /> },
      { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
      { name: 'HTML/CSS', icon: <FaCode className="text-orange-400" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: 'Shadcn/ui', icon: <FaPalette className="text-white" /> },
      { name: 'Bootstrap', icon: <FaPalette className="text-purple-500" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <FaServer className="text-gray-300" /> },
      { name: 'Prisma ORM', icon: <FaDatabase className="text-teal-500" /> }
    ],
    aiMl: [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
      { name: 'Scikit-learn', icon: <FaTools className="text-blue-400" /> },
      { name: 'NLP', icon: <FaCode className="text-purple-400" /> },
      { name: 'Pandas', icon: <FaDatabase className="text-red-500" /> },
      { name: 'NumPy', icon: <FaCode className="text-blue-400" /> },
      { name: 'Matplotlib', icon: <FaPalette className="text-green-400" /> }
    ],
    databases: [
      { name: 'Supabase', icon: <FaDatabase className="text-green-400" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'Cloudinary', icon: <FaDatabase className="text-blue-400" /> }
    ],
    tools: [
      { name: 'Git', icon: <FaTools className="text-orange-500" /> },
      { name: 'VS Code', icon: <FaCode className="text-blue-400" /> },
      { name: 'Shopify', icon: <SiShopify className="text-green-500" /> },
      { name: 'Jupyter Notebook', icon: <FaCode className="text-orange-500" /> },
      { name: 'Vercel', icon: <SiVercel className="text-white" /> }
    ]
  }

  const projects = [
    {
      title: "Full-Stack E-Commerce Apparel Store",
      description: "Developed user authentication, real-time cart management, and secure payment gateway. Engineered a scalable admin dashboard with Express.js.",
      tech: ["Next.js 15", "Shadcn UI", "Tailwind CSS", "TypeScript", "Supabase", "Prisma ORM", "Express.js", "Cloudinary"],
      impact: "Improved checkout efficiency by 30%; achieved 90% mobile responsiveness.",
      links: [
        { url: "https://bealphax.vercel.app/", icon: <FaExternalLinkAlt />, label: "Live Demo" },
        { url: "https://github.com/SOFTJIT-SINGH/bealphax.git", icon: <FaGithub />, label: "GitHub" }
      ]
    },
    {
      title: "Todo list With AI Suggestions",
      description: "Integrated Gemini API for AI-powered task suggestions to improve task completion efficiency.",
      tech: ["Next.js 15", "Shadcn", "Tailwind", "TypeScript", "Gemini API"],
      impact: "Improved task completion efficiency by ~20% through AI-powered recommendations.",
      links: [
        { url: "https://alphatodo-mauve.vercel.app/", icon: <FaExternalLinkAlt />, label: "Live Demo" },
        { url: "https://github.com/SOFTJIT-SINGH/alphatodo.git", icon: <FaGithub />, label: "GitHub" }
      ]
    },
    {
      title: "Resume Checker Pro with AI",
      description: "AI-powered resume analysis tool that provides feedback and improvements suggestions.",
      tech: ["Next.js", "AI/ML", "NLP", "Tailwind CSS"],
      impact: "Helps job seekers optimize their resumes for better visibility and impact.",
      links: []
    },
    {
      title: "T-Shirt Online Store with Shopify",
      description: "Designed, managed, and optimized an online t-shirt store with streamlined inventory and sales tracking.",
      tech: ["Shopify", "E-commerce", "Inventory Management"],
      impact: "Successful online store with efficient inventory and sales management.",
      links: [
        { url: "https://www.ngcreattion.net/", icon: <FaExternalLinkAlt />, label: "Visit Store" }
      ]
    }
  ]

  const certifications = [
    "3rd Position – IoT Workshop (College-level)",
    "Hands-on Automation Experience – Robotics Workshop",
    "Grade A – Computer Applications (Arya Infotech)",
    "Awareness Campaign Participant – International Literacy Day",
    "A+ Grade – Guru Gobind Singh Study Circle Quiz",
    "Core Organizer – College Tech Fest",
    "1st Prize – Academic Excellence (Class 9 & 10)"
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
            SOFTJIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">SINGH</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-400 mb-8">
            Full-Stack Developer | MCA Candidate | AI/ML Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">📞 +91 000000000</span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">✉️ 000000@gmail.com</span>
            <a href="https://linkedin.com/in/softjit-singh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              🔗 LinkedIn
            </a>
            <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              💻 GitHub
            </a>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Professional Summary
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            MCA candidate and full-stack developer skilled in Next.js, TypeScript, and AI/ML applications. 
            Experienced in building scalable, high-performance web solutions and improving user experience (30% faster checkout). 
            Seeking opportunities as a Software Engineer or AI-focused Full-Stack Developer.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
            Technical Skills
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {Object.keys(skills).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' 
                  : 'bg-zinc-800/50 text-gray-400 border border-white/5 hover:bg-zinc-700'
                }`}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* FIXED BUG: Used skills[activeTab as keyof typeof skills] */}
            {skills[activeTab as keyof typeof skills].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center justify-center p-6 bg-zinc-950/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                <span className="text-sm font-medium text-gray-300 text-center">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
            Education
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start group">
              <div className="bg-zinc-800 border border-white/10 p-4 rounded-full mr-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                <FaGraduationCap className="text-gray-300 group-hover:text-purple-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Guru Nanak Dev University</h3>
                <p className="text-blue-400 font-semibold mt-1">MCA, 8.0 CGPA%</p>
                <p className="text-gray-500 text-sm mt-2">2024 – 2026 | Amritsar, Punjab</p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-zinc-800 border border-white/10 p-4 rounded-full mr-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                <FaGraduationCap className="text-gray-300 group-hover:text-purple-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">DAV COLLEGE (Guru Nanak Dev University)</h3>
                <p className="text-blue-400 font-semibold mt-1">BCA, 76%</p>
                <p className="text-gray-500 text-sm mt-2">2019 – 2022 | Amritsar, Punjab</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
            Notable Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-950/50 border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-colors flex flex-col"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-zinc-800 border border-zinc-700 text-gray-300 rounded-full text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl mb-6">
                  <span className="text-green-400 font-semibold text-sm uppercase tracking-wider block mb-1">Impact</span>
                  <span className="text-gray-300 text-sm">{project.impact}</span>
                </div>
                
                {project.links.length > 0 && (
                  <div className="flex gap-4 mt-auto">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
            Certifications & Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center p-4 bg-zinc-950/50 border border-white/5 rounded-2xl"
              >
                <div className="bg-zinc-800 p-3 rounded-full mr-4">
                  <FaTrophy className="text-yellow-500" />
                </div>
                <span className="text-gray-300 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioPage