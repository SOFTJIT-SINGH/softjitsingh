'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaClock, FaPaperPlane, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">
            Get in <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a question or want to work together? Feel free to contact me!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <div className="bg-zinc-800 border border-white/10 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Address</h3>
                <p className="text-gray-400">Hargobind Nagar, Kot Khalsa, Amritsar</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="bg-zinc-800 border border-white/10 p-3 rounded-full mr-4">
                <FaPhone className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="text-gray-400">+91 8528473685</p>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="bg-zinc-800 border border-white/10 p-3 rounded-full mr-4">
                <FaClock className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Availability</h3>
                <p className="text-gray-400">24/7</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/softjit-singh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 border border-white/10 p-3 rounded-full text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a 
                  href="https://github.com/SOFTJIT-SINGH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 border border-white/10 p-3 rounded-full text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a 
                  href="https://www.instagram.com/softjit_singh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 border border-white/10 p-3 rounded-full text-gray-400 hover:text-white hover:bg-zinc-700 transition-all"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Find Me Here</h2>
            <div className="rounded-2xl overflow-hidden h-96 ring-1 ring-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d37706.228355325125!2d74.77841973229401!3d31.633621191806057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39196526b773175d%3A0xb78109348cd540b!2sGuru%20Nanak%20Dev%20University%2C%20Amritsar%2C%20Punjab!3m2!1d31.6345171!2d74.82293159999999!5e0!3m2!1sen!2sin!4v1743595725748!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-3 bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/20 border border-green-500/20 text-green-400 p-4 rounded-lg mb-6"
              >
                Your message has been sent successfully! I&apos;ll get back to you soon.
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                  placeholder="What&apos;s this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black font-bold py-3.5 px-4 rounded-full transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-white/5"
        >
          <h3 className="text-2xl font-bold text-white mb-2">SOFTJIT SINGH</h3>
          <p className="text-gray-500">Full Stack Developer & Designer</p>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage