import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '1rem',
      backgroundColor: '#333',
      color: 'white',
    }}>
      <Link href="/" style={{ color: 'white', fontWeight: 'bold' }}>HOME</Link>
      <Link href="/learn" style={{ color: '#aaa' }}>NextJS Dashboard</Link>
      <Link href="/study" style={{ color: '#aaa' }}>Study</Link>
      <Link href="/summary" style={{ color: '#aaa' }}>Summary</Link>
    </nav>
  );
}