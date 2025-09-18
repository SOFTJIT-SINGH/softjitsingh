'use client'

import { motion } from 'framer-motion'
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get to know more about my skills, experience, and what I can bring to your project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-blue-100 dark:bg-blue-900/20 w-80 h-80 rounded-full absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-72 h-72 rounded-2xl mx-auto overflow-hidden shadow-xl">
              {/* Placeholder for your image */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Your Photo</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Full Stack Developer & Designer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I&apos;m a passionate developer with expertise in creating modern, responsive web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean code and intuitive design.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              My approach combines technical expertise with creative problem-solving to deliver 
              solutions that not only function flawlessly but also provide exceptional user experiences.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <div className="text-blue-600 mb-2">{skill.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Journey</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl max-w-4xl mx-auto">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My journey in web development began with a curiosity about how websites work. 
              Over time, this curiosity evolved into a passion for creating digital experiences 
              that make a difference.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I&apos;ve worked with various technologies and frameworks, always striving to stay 
              updated with the latest trends and best practices in the industry.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}