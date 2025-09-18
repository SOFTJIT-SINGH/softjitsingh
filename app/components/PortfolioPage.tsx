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
  const [activeTab, setActiveTab] = useState('skills')

  const skills = {
    languages: [
      { name: 'Python', icon: <FaPython className="text-blue-500" /> },
      { name: 'Java', icon: <FaJava className="text-red-500" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-500" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
      { name: 'C++', icon: <FaCode className="text-purple-500" /> },
      { name: 'SQL', icon: <FaDatabase className="text-teal-500" /> },
      { name: 'PHP', icon: <FaServer className="text-indigo-500" /> }
    ],
    frontend: [
      { name: 'Next.js 15', icon: <SiNextdotjs className="text-black" /> },
      { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
      { name: 'HTML/CSS', icon: <FaCode className="text-orange-500" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: 'Shadcn/ui', icon: <FaPalette className="text-blue-600" /> },
      { name: 'Bootstrap', icon: <FaPalette className="text-purple-600" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
      { name: 'Express.js', icon: <FaServer className="text-gray-800" /> },
      { name: 'Prisma ORM', icon: <FaDatabase className="text-teal-600" /> }
    ],
    aiMl: [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
      { name: 'Scikit-learn', icon: <FaTools className="text-blue-700" /> },
      { name: 'NLP', icon: <FaCode className="text-purple-700" /> },
      { name: 'Pandas', icon: <FaDatabase className="text-red-600" /> },
      { name: 'NumPy', icon: <FaCode className="text-blue-800" /> },
      { name: 'Matplotlib', icon: <FaPalette className="text-green-700" /> }
    ],
    databases: [
      { name: 'Supabase', icon: <FaDatabase className="text-green-500" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
      { name: 'Cloudinary', icon: <FaDatabase className="text-blue-400" /> }
    ],
    tools: [
      { name: 'Git', icon: <FaTools className="text-orange-600" /> },
      { name: 'VS Code', icon: <FaCode className="text-blue-500" /> },
      { name: 'Shopify', icon: <SiShopify className="text-green-700" /> },
      { name: 'Jupyter Notebook', icon: <FaCode className="text-orange-700" /> },
      { name: 'Vercel', icon: <SiVercel className="text-black" /> }
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
      title: "Movie Genius with AI",
      description: "AI-based movie recommendation system that suggests films based on user preferences.",
      tech: ["Next.js", "AI/ML", "Recommendation Engine", "Tailwind CSS"],
      impact: "Personalized movie suggestions based on user preferences and viewing history.",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SOFTJIT <span className="text-blue-600">SINGH</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Full-Stack Developer | MCA Candidate | AI/ML Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
            <span>📞 +91 000000000</span>
            <span>✉️ 000000@gmail.com</span>
            <a href="https://linkedin.com/in/softjit-singh" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              🔗 linkedin.com/in/softjit-singh
            </a>
            <a href="https://github.com/SOFTJIT-SINGH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              💻 github.com/SOFTJIT-SINGH
            </a>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Summary</h2>
          <p className="text-gray-600 dark:text-gray-300">
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
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Skills</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('languages')}
              className={`px-4 py-2 rounded-full ${activeTab === 'languages' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Languages
            </button>
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-4 py-2 rounded-full ${activeTab === 'frontend' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-4 py-2 rounded-full ${activeTab === 'backend' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Backend
            </button>
            <button
              onClick={() => setActiveTab('aiMl')}
              className={`px-4 py-2 rounded-full ${activeTab === 'aiMl' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              AI/ML
            </button>
            <button
              onClick={() => setActiveTab('databases')}
              className={`px-4 py-2 rounded-full ${activeTab === 'databases' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Databases
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-2 rounded-full ${activeTab === 'tools' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Tools
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages[activeTab].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Education</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4 mt-1">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Guru Nanak Dev University</h3>
                <p className="text-gray-600 dark:text-gray-300">MCA (pursuing), 2nd sem, 8.0 CGPA%</p>
                <p className="text-gray-500 dark:text-gray-400">2024 – Present | Amritsar, Punjab</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4 mt-1">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DAV COLLEGE (Guru Nanak Dev University)</h3>
                <p className="text-gray-600 dark:text-gray-300">BCA, 76%</p>
                <p className="text-gray-500 dark:text-gray-400">2019 – 2022 | Amritsar, Punjab</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Projects</h2>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  <span className="font-medium">Impact:</span> {project.impact}
                </p>
                
                {project.links.length > 0 && (
                  <div className="flex gap-4">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {link.icon}
                        <span className="ml-1">{link.label}</span>
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
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Certifications & Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3 mt-1">
                  <FaTrophy className="text-blue-600" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Tech Stack</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Framework</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Next.js 15 (React 19+)</strong> - App Router, React Server Components, Server Actions, advanced SSR/ISR/SSG strategies, 
                middleware for geo-personalization, device detection, access control, SEO enhancements, Turbopack optimization.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Language</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>TypeScript</strong> - Strict types, custom interfaces, codegen for API typing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Styling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Tailwind CSS</strong> - Utility-first, atomic modular components, custom theme, dark/light modes, 
                PurgeCSS for minimal bundle size, design tokens for branding consistency.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">UI</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Shadcn/ui</strong> - Modular components, accessibility-first, Radix primitives, WCAG compliance, 
                scoped styling, extendable props, performance-oriented.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Database</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>MongoDB Atlas (Serverless)</strong> - Horizontal/vertical scaling, sharding, automated failover, 
                global clusters, aggregation pipeline, serverless integration.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Vercel (Enterprise)</strong> - Edge network, instant preview, zero-downtime production deploy, 
                serverless API routes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioPage