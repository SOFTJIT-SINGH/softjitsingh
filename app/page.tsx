import Image from 'next/image'
import Link from 'next/link'
// import Hero from './components/Hero'
import Hero from './components/Hero2'
import About from './components/about'
import PortfolioPage from './components/PortfolioPage'

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen sm:p-20 height-[100dvh]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        {/* <PortfolioPage />
         */}
         <section id="1"><Hero /></section>
         <section id="2"><About/></section>
         <section id="3"></section>
         <section id="4"></section>
        
        
        <Link href='/about'>Wanna Know About me?</Link>
        <Link href='/portfolio'>portfolioPage?</Link>
        <Link href='/contact'>Wanna contact me?</Link>
      </main>
    </div>
  )
}
