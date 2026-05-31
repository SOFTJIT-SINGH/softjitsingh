'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCode, FaPalette, FaServer, FaMobile } from 'react-icons/fa'

export default function About() {
  const skills = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks."
    },
    {
      icon: <FaServer className="text-2xl" />,
      title: "Backend Development",
      description: "Building robust server-side applications with Node.js, Express, and MongoDB databases."
    },
    {
      icon: <FaMobile className="text-2xl" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications with React Native and Flutter."
    },
    {
      icon: <FaPalette className="text-2xl" />,
      title: "UI/UX Design",
      description: "Designing intuitive and visually appealing user experiences with Figma and Adobe Creative Suite."
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">
            About <span className="text-blue-400">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get to know more about my skills, experience, and what I can bring to your project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image src="/Haridwar.jpg" alt="Profile" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Full Stack Developer & Designer
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              I&apos;m a passionate developer with expertise in creating modern, responsive web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean code and intuitive design.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              My approach combines technical expertise with creative problem-solving to deliver 
              solutions that not only function flawlessly but also provide exceptional user experiences.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl"
                >
                  <div className="text-blue-400 mb-3 text-2xl">{skill.icon}</div>
                  <h4 className="font-semibold text-white mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl">
            <p className="text-gray-400 leading-relaxed mb-4">
              My journey in web development began with a curiosity about how websites work. 
              Over time, this curiosity evolved into a passion for creating digital experiences 
              that make a difference.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I&apos;ve worked with various technologies and frameworks, always striving to stay 
              updated with the latest trends and best practices in the industry.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}