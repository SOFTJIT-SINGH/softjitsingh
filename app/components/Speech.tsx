'use client'
import { TypeAnimation } from "react-type-animation"

const Speech = () => {
  return (
    <div className='w-1/2 flex justify-between'>
      <div className='bubble w-full height-[100px] p-3 mr-2 rounded-2xl bg-white text-[#555] font-medium flex items-center text-center'>
            <TypeAnimation
sequence={[
            'Full-Stack Developer specializing in modern web applications',
            1500,
            'Next.js 15 & React Expert with TypeScript',
            1500,
            'AI/ML Enthusiast building intelligent applications',
            1500,
            'Creating responsive designs with Tailwind CSS',
            1500,
            'Building scalable backend solutions with Node.js',
            1500,
            'MongoDB & Supabase Database Specialist',
            1500
          ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
        Full Stack Developer & Designer specializing in modern web applications
      </div>
      <img src='/man.png' alt='Man' />
    </div>
  )
}
export default Speech
