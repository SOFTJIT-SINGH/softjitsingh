'use client'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'

const Speech = () => {
  return (
    // <div className='bubbleContainer flex items-center justify-center w-full max-w-2xl mx-auto px-4 fixed top-[40%]'>
    <div className='bubbleContainer right-0 top-1/2'>
      <div
        className='
          bubble flex-1 
          h-[120px] sm:h-[140px] md:h-[160px] 
          p-4 mr-3 rounded-2xl 
          bg-white dark:bg-zinc-800 
          text-gray-700 dark:text-gray-200 
          font-medium 
          flex items-center justify-center text-center
          shadow-lg
        '
      >
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
            1500,
          ]}
          wrapper='span'
          speed={50}
          // className='block w-full text-sm sm:text-base md:text-lg text-center whitespace-nowrap overflow-hidden text-ellipsis'
          repeat={Infinity}
        />
      </div>

      <Image
        src='/man.png'
        alt='Man'
        className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 border-2 border-emerald-500 items-end'
        width={100}
        height={100}
      />
    </div>
  )
}

export default Speech
