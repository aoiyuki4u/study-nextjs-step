"use client";

interface WelcomeProps {
  userName:string;
  level:number;
}

function WelcomeBanner({userName, level}: WelcomeProps){
  return(
    <div>
      <h3>{userName} Welcome</h3>
      <p>level: {level}</p>
    </div>
  )
}

export default function Home() {
  const greeting:string = "Next.js TypeScript"

  return(
    <main style={{padding:'20px', textAlign:'center'}}>
      <div style={{padding:'20px', border:'1px solid #333'}}>
        <h1>{greeting}</h1>
        <p>123123123123</p>

        <button
          onClick={()=>alert('123')}
          style={{margin:'10px', padding:'10px'}}
        >
          123123
        </button>
      </div>

      <br />
      <div style={{padding:'20px', border:'1px solid #333'}}>
        <h1>Interface</h1>
        <WelcomeBanner userName="NextJs" level={0} />
      </div>
      
      <br />
      <div style={{padding:'20px', border:'1px solid #333'}}>
        <h1>Interface</h1>
        <WelcomeBanner userName="NextJs" level={0} />
      </div>
    </main>
  );
}