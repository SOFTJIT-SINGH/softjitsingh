import Image from 'next/image'
import Link from 'next/link'
import {
  FaMapMarkerAlt,
  FaFacebook,
  FaPhone,
  FaClock,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa'
import Speech from './Speech'

const Hero = () => {
  return (
    // <div>
    <div className='hero flex height-[100%] overflow-hidden '>
      {/* left section  */}

      <div className='hsection'>
        <h1 className='font-extrabold text-7xl mt-8'>
          <span className='text-pink-400'>Hi, I'm</span>
          <br /> <span className='text-white'>Softjit Singh</span>
        </h1>
        {/* awards  */}
        <div className='width-[30%] mt-8'>
          <h2 className='text-3xl font-bold'>
            Top Rated Designer and Developer{' '}
          </h2>
          <p className='text-xl font-medium my-4'>
            Full Stack Developer & Designer specializing in modern web
            applications
          </p>
          <div className='flex flex-row gap-4 mt-4'>
            <Image
              src='/award1.png'
              alt='award'
              width={36}
              height={36}
              className='bg-white rounded-full p-1'
            />
            <Image
              src='/award2.png'
              alt='award'
              width={36}
              height={36}
              className='bg-white rounded-full p-1'
            />
            <Image
              src='/award3.png'
              alt='award'
              width={36}
              height={36}
              className='bg-white rounded-full p-1'
            />
          </div>
        </div>

        {/* Scroll Svg */}
        <div className='scroll-down mt-8'>
          <Link href='#about' className='scroll-link'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='50'
              height='50'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-arrow-down'
            >
              <path
                d='M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z'
                stroke='white'
                strokeWidth='1'
              />
              <line x1='12' y1='5' x2='12' y2='19'></line>
              <polyline points='19 12 12 19 5 12'></polyline>
            </svg>
          </Link>
        </div>
      </div>
      {/* Right section  */}

      <div className='hsection justify-end items-end flex flex-col gap-5'>
        {/* Follow  */}
        <div
          // className='follow flex flex-col gap-1 p-1 bg-[#2f204e]'
          // style={{ borderBottomRightRadius: '10px' }}
          className='follow'>
          {/* <div className='flex flex-col items-end mb-2 gap-1.5 '> */}
            <Link
              href='https://www.linkedin.com/in/softjit-singh'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 transition-colors'
            >
              <FaLinkedin className='text-xl' />
            </Link>
            <Link
              href='https://github.com/SOFTJIT-SINGH'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-gray-400 dark:hover:bg-blue-900/30 transition-colors'
            >
              <FaGithub className='text-xl' />
            </Link>
            <Link
              href='https://www.instagram.com/softjit_singh'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-pink-700 dark:hover:bg-blue-900/30 transition-colors'
            >
              <FaInstagram className='text-xl' />
            </Link>
          </div>
         
          <div className='.followTextContainer'>
            <h3 className='followText'>Follow Me</h3>
          {/* </div> */}
        </div>

        {/* Bubble  */}
        <p>
          {/* Full Stack Developer & Designer specializing in modern web
          applications */}
        </p>
        <Speech />
        {/* certificate  */}
        <div className='certificate'>
          <Image
            src='/certificate.png'
            alt='certificate'
            width={100}
            height={100}
          />
          <span>LAMA CERTIFIED</span>
          <br />
          <span>PROFESSIONAL</span>
          <br /> <span>UI DESIGNER</span>
        </div>
        {/* CONTACT      */}
        <div className='contact'>
          <Link href='/#contact'>
            <svg viewBox='0 0 200 200' width='100' height='150'>
              <circle cx='100' cy='100' r='90' fill='pink' />
              <path
                id='innerCirclePath'
                fill='none'
                d='M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0'
              />
              <text className='circleText'>
                <textPath href='#innerCirclePath'>Hire Now •</textPath>
              </text>
              <text className='circleText'>
                <textPath href='#innerCirclePath' startOffset='44%'>
                  Contact Me •
                </textPath>
              </text>
            </svg>
            <div className='arrow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='50'
                height='50'
                fill='none'
                stroke='black'
                strokeWidth='2'
              >
                <line x1='6' y1='18' x2='18' y2='6' />
                <polyline points='9 6 18 6 18 15' />
              </svg>
            </div>
          </Link>
        </div>
        <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-2xl'>View My Work</button>
      </div>
    </div>
    // </div>
  )
}
export default Hero
