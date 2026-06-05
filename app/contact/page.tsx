'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaClock, FaPaperPlane, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch {
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-16"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
            Let&apos;s Build Something
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project, a role, or just a technical question? Reach out and I&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Quick Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FaEnvelope className="text-blue-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email</p>
                  <a href="mailto:softjitsingh@gmail.com" className="text-sm text-white hover:text-blue-400 transition-colors">softjitsingh@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FaPhone className="text-blue-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Phone</p>
                  <p className="text-sm text-white">+91 85284 73685</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FaClock className="text-blue-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Availability</p>
                  <p className="text-sm text-white">Typically responds within 2 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-4">Also find me on</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/softjit-singh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaLinkedin size={16} />
                </a>
                <a 
                  href="https://github.com/SOFTJIT-SINGH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaGithub size={16} />
                </a>
                <a 
                  href="mailto:softjitsingh@gmail.com"
                  className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaEnvelope size={16} />
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Why work with me?</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Production apps shipped</span>
                  <span className="text-white font-medium">10+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Concurrent users supported</span>
                  <span className="text-white font-medium">500+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery cycle</span>
                  <span className="text-white font-medium">3-5 days</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
            <p className="text-sm text-gray-400 mb-8">Fill in the form and I&apos;ll get back to you within 24 hours.</p>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/20 border border-green-500/20 text-green-400 p-4 rounded-lg mb-6"
              >
                Message sent successfully! I&apos;ll respond within 24 hours.
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm resize-none"
                  placeholder="Tell me about your project, role, or question..."
                ></textarea>
              </div>
              
              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaArrowRight className="ml-2" size={12} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage