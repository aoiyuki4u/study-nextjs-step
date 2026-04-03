"use client";
import Link from 'next/link';

export default function Home(){
  return (
    <main style={{
      padding:'40px',
      textAlign:'center'
    }}>
      <div style={{ 
        margin: '30px', 
      }}>
        <dl className='flex w-full items-center'>
          <dt className='p-5'>Nextjs Dashboard : </dt>
          <dd>
            <Link href="/learn" style={buttonStyle}>NextJS Dashboard</Link>
          </dd>
        </dl>
        {/* <dl className='flex w-full items-center'>
          <dt className='p-5'>study...ing : </dt>
          <dd>
            <Link href="/study" style={buttonStyle}>study</Link>
          </dd>
        </dl> */}
        
        
      </div>
    </main>
  )
}

const buttonStyle = {
  padding: '15px 25px',
  backgroundColor: '#0070f3',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

