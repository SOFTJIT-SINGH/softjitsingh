// import Image from 'next/image'
import Link from 'next/link'
// import Hero from './components/Hero'
import Hero from './components/Hero2'
import About from './components/about'
// import PortfolioPage from './components/PortfolioPage'

export default function Home() {
  return (
    <div className='font-sans min-h-screen'>
      <section
        id='hero'
        className='min-h-screen flex items-center justify-center'
      >
        <Hero />
      </section>
      <section
        id='about'
        className='min-h-screen flex items-center justify-center'
      >
        <About />
      </section>
      <section
        id='links'
        className='min-h-screen flex items-center justify-center '
      >
        <div className='flex flex-col gap-4 items-center bg-[#0e0127] rounded-2xl p-8 max-w-md shadow-lg'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 '>
            <Link href='/about'>Wanna Know About me?</Link>
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 '>
            <Link href='/portfolio'>portfolioPage?</Link>
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3'>
            <Link href='/contact'>Wanna contact me?</Link>
          </button>
        </div>
      </section>
    </div>
  )
}
