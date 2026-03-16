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
function sayHello(name: string, age: number): string {
  return `${name}의 내년 나이 ${age + 1}살`;
}
console.log(sayHello("철수", 44));

enum ProjectStatus {
  Todo,        // 0
  InProgress,  // 1
  Done         // 2
}
let currentStatus: ProjectStatus = ProjectStatus.InProgress;
if (currentStatus === ProjectStatus.InProgress) {
  console.log(ProjectStatus);
}

interface Member {
  name: string;
  level: number;
}
const team: Member[] = [
  { name: "민수", level: 1 },
  { name: "철수", level: 2 },
];
const newMember: Member = { name: "영희", level: 3 };
team.push(newMember);
console.log(team)

export default function Home() {
  const greeting:string = "Next.js TypeScript";  

  return(
    <main style={{padding:'20px'}}>
      <div className="flex flex-wrap gap-1">
        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">1. 변수</p>
          <pre>
            <code className="language-js">
              {`변수 이름 뒤에 : 타입 이름을 붙임
기본 타입: string, number, boolean
let name: string = "문자열";
let age: number = 25;
let isStudent: boolean = true;`}
            </code>
          </pre>
        </div>
        
        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">2. 타입</p>
          <pre>
            <code className="language-js">
              {`// (a는 숫자, b는 숫자)이면, 결과값도 : 숫자여야 함
function add(a: number, b: number): number {
  return a + b;
}
add(10, 20); // 정상
add(10, "20"); // 에러 `}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">3. 타입</p>
          <pre>
            <code className="language-js">
              {`const greeting:string = "Next.js TypeScript"
<h1>{greeting}</h1>
<button
  onClick={()=>alert('123')}
  style={{margin:'10px', padding:'10px', border:'1px solid #333'}}
>
  123123
</button>`}
            </code>
          </pre>
          <div className="bg-white text-black p-4 rounded-lg overflow-x-auto mt-2">
            <p>{greeting}</p>
            <button
              onClick={()=>alert('123')}
              style={{margin:'10px', padding:'10px', border:'1px solid #333'}}
            >
              123123
            </button>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">4. 함수 매개변수, 리턴값 타입</p>
          <pre>
            <code className="language-js">
              {'function sayHello(name: string, age: number): string {\n' +
'  return `${name}의 내년 나이 ${age + 1}살`;\n' +
'}\n' +
'console.log(sayHello("철수", 44));'}
            </code>
          </pre>
          <div className="bg-white text-black p-4 rounded-lg overflow-x-auto mt-2">
            철수의 내년 나이 45살
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">5. 인터페이스(Interface)</p>
          <p className="text-l">데이터를 미리 설계</p>
          <pre>
            <code className="language-js">
              {`interface User {
  id: number;
  userName: string;
  isPremium?: boolean; // '?' 있어도 되고 없어도 됨
}
const myUser: User = {
  id: 1,
  userName: "dev_1981"
};
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">5-1. 인터페이스(Interface) 객체</p>
          <p className="text-l">interface를 통해 객체의 '규격'을 정함</p>
          <pre>
            <code className="language-js">
              {`interface Post {
  id: number;
  title: string;
  content: string;
  author?: string; // ?선택 사항
}
const myPost: Post = {
  id: 1,
  title: "오늘 할일",
  content: "TypeScript"
  // author는 ?니깐 없어도 됨
};
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">6. 유니온 타입 (Union Type)</p>
          <p className="text-l">변수가 한 가지 타입이 아니라 여러 타입을 가질 수 있을 때 : |</p>
          <pre>
            <code className="language-js">
              {`- 변수 사용
let status: string | number;
  status = "Success"; // true
  status = 404;       // true
  status = true;      // false(블리언X)
}
`+
'- 함수에서 사용\n'+
'function printId(id: number | string) {\n'+
'  console.log(`Your ID is: ${id}`);\n'+
'}'
}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">7. 배열(Array)</p>
          <p className="text-l">배열 타입을 선언 필요</p>
          <pre>
            <code className="language-js">
              {`- Number
let numbers: number[] = [1, 2, 3, 4, 5];
- String
let skills: string[] = ["React", "TypeScript", "GSAP"];
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">8. 열거형(Enum)</p>
          <p className="text-l">연관된 상수들을 이름으로 묶어서 관리<br />값이 없으면 자동 할당(012...)</p>
          <pre>
            <code className="language-js">
              {`enum ProjectStatus {
  Todo,        // 0
  InProgress,  // 1
  Done         // 2
}
let currentStatus: ProjectStatus = ProjectStatus.InProgress;
if (currentStatus === ProjectStatus.InProgress) {
  console.log(currentStatus); //1
}
`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <p className="text-xl font-bold">9. 배열+인터페이스</p>
          <pre>
            <code className="language-js">
              {`interface Member {
  name: string;
  level: number;
}
const team: Member[] = [
  { name: "민수", level: 1 },
  { name: "철수", level: 2 },
];
const newMember: Member = { name: "영희", level: 3 };
team.push(newMember);
`}
            </code>
          </pre>
        </div>


      </div>
    </main>
  );
}