import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
        display: 'flex',
        gap: '20px',
        padding: '1rem',
        backgroundColor: '#333',
        color: 'white',
      }}
      className='sticky top-0 z-50'
    >
      <Link href="/" style={{ color: 'white', fontWeight: 'bold' }}>HOME</Link>
      <Link href="/learn" style={{ color: '#aaa' }}>NextJS Dashboard</Link>
      <Link href="/summary" style={{ color: '#aaa' }}>Summary</Link>
      <Link href="/typescript" style={{ color: '#aaa' }}>TypeScript</Link>      
      <Link href="/motion/framer" style={{ color: '#aaa' }}>Framer</Link>
      <Link href="/motion/gsap" style={{ color: '#aaa' }}>GSAP</Link>
      <Link href="/motion/svg" style={{ color: '#aaa' }}>SVG</Link>
      <Link href="/motion/swiper" style={{ color: '#aaa' }}>Swiper</Link>
      <Link href="/motion/parallax" style={{ color: '#aaa' }}>Parallax</Link>
      <Link href="/quote" style={{ color: '#aaa' }}>Quote</Link>
      <Link href="https://trandsmap.vercel.app/" target='_blank' style={{ color: '#aaa' }}>Trends</Link>
      <Link href="https://geo-next-three.vercel.app/" target='_blank' style={{ color: '#aaa' }}>GEO LLms</Link>
      <Link href="https://mpm-ecru.vercel.app/" target='_blank' style={{ color: '#aaa' }}>투자 페르소나</Link>
    </nav>
  );
}