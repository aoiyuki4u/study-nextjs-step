"use client";
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Home() {
  const twTableCell = "p-1 border border-slate-300";

  return(
    <main style={{padding:'20px'}}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 375: 1, 768: 2, 1024: 3}}
      >
        <Masonry gutter="10px">
          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">1장 시작</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">npm</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>모든 디펜던시를 프로젝트의 node_modules 디렉토리에 설치</li>
                  <li>디펜던시 중복 가능, 프로젝트 클수록 용량 늘어남</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">pnpm</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>패키지를 중앙 저장소(글로벌 스토리지)에 한 번만 설치</li>
                  <li>각 프로젝트의 node_modules 디렉토리에는 심볼릭 링크를 사용</li>
                  <li>디스크 공간 절약하고, 설치 속도가 더 빠름</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">2장 CSS 스타일링</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">CSS 라이브러리</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>clsx, styled-jsx, styled-components</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">3장 글꼴 및 이미지 최적화</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">웹폰트</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>빌드 시점에 글꼴 파일을 다운로드하여 다른 정적 자산과 함께 호스팅</li>
                  <li>사용자가 애플리케이션에 접속할 때 글꼴 관련 추가 네트워크 요청이 발생하지 않음</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">&lt;Image&gt;</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>이미지 로딩 시 레이아웃이 자동으로 변경되는 것을 방지</li>
                  <li>화면 크기가 작은 기기에 큰 이미지를 전송하지 않도록 이미지 크기를 조정</li>
                  <li>기본적으로 이미지는 지연 로딩됩니다(이미지가 뷰포트에 들어올 때 로드됨)</li>
                  <li>WebP(AVIF)와 같은 최신 형식으로 이미지를 제공합니다.(브라우저가 지원하는 경우)</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">4장 레이아웃 및 페이지 생성</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">layout.tsx</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>여러 페이지에서 공유되는 UI(예: 사이드바, 네비게이션)를 정의</li>
                  <li>페이지 이동 시에도 다시 렌더링되지 않음.</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">page.tsx</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>경로에서 보여지는 실제 콘텐츠 파일</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">5장 페이지 간 이동</p>
            <p className="text-xl">SPA(Single Page Application)</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">React (기본적으로 CSR)</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>브라우저가 서버로부터 아주 간단한 HTML 파일과 거대한 JavaScript 파일을 내려받음.</li>
                  <li>브라우저에서 JavaScript가 실행되면서 화면을 그리기 시작</li>
                  <li>초기 로딩 속도가 느리고, 검색 엔진(SEO)이 빈 HTML만 보게 되어 검색 노출에 불리할 수 있습니다.</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">Next.js (SSR/SSG/PPR)</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>서버에서 미리 HTML을 생성하여 브라우저에 전달</li>
                  <li>사용자는 JavaScript가 다 로드되기 전에도 완성된 화면을 먼저 볼 수 있음.</li>
                  <li>초기 로딩 속도(FCP)가 빠르고 검색 엔진 최적화(SEO)에 매우 유리</li>
                </ul>
              </dd>
            </dl>
            <table className="border-slate-400">
              <colgroup><col className="min-w-[6.25rem]" /></colgroup>
              <thead>
                <tr>
                  <td className={twTableCell}>구분</td>
                  <td className={twTableCell}>React (Pure SPA)</td>
                  <td className={twTableCell}>Next.js (Framework)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={twTableCell}>주요 렌더링</td>
                  <td className={twTableCell}>CSR (클라이언트 사이드)</td>
                  <td className={twTableCell}>SSR, SSG, ISR (서버/정적 생성)</td>
                </tr>
                <tr>
                  <td className={twTableCell}>SEO</td>
                  <td className={twTableCell}>추가 설정 필요</td>
                  <td className={twTableCell}>기본 탑재</td>
                </tr>
                <tr>
                  <td className={twTableCell}>라우팅</td>
                  <td className={twTableCell}>라이브러리 설치 필요</td>
                  <td className={twTableCell}>파일 시스템 기반 (자동)</td>
                </tr>
                <tr>
                  <td className={twTableCell}>초기 로딩</td>
                  <td className={twTableCell}>자바스크립트 양에 따라 느려짐</td>
                  <td className={twTableCell}>미리 생성된 HTML 덕분에 빠름</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">6장 데이터베이스 설정</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">Seeding</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>초기 데이터를 데이터베이스에 채워 넣는 작업입니다.</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">7장 데이터 가져오기</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">Request Waterfalls</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>하나의 데이터 요청이 끝나야 다음 요청이 시작되는 현상</li>
                  <li>다음 요청을 보내기 전에 특정 조건이 충족되어야 하는 경우</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">병렬 데이터 가져오기</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>Promise.all(), Promise.allSettled()</li>
                  <li>모든 데이터 가져오기 작업을 동시에 실행하면 워터폴 방식 보다 빠름</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">8장 정적, 동적 렌더링</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">정적 렌더링</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>빌드 타임에 미리 페이지를 만들어 두는 방식</li>
                  <li>데이터 가져오기 및 렌더링은 빌드 시점(배포 시) 또는 데이터 재검증 시 서버에서 발생</li>
                  <li>사용자가 애플리케이션을 방문할 때마다 캐시된 결과가 제공</li>
                  <li>웹사이트 속도 향상 - 사전 렌더링된 콘텐츠는 플랫폼에 배포될 때 캐시됨.</li>
                  <li>서버 부하 감소 - 콘텐츠가 캐시되므로 서버는 각 사용자 요청에 대해 콘텐츠를 동적으로 생성할 필요가 없음. 이는 컴퓨팅 비용을 절감</li>
                  <li>SEO 측면에서, 사전 렌더링된 콘텐츠는 페이지 로드 시 이미 제공되므로 검색 엔진 크롤러가 색인화하기 쉽다. 이는 검색 엔진 순위 향상으로 이어질 수 있다.</li>
                  <li>데이터가 없거나 사용자 간에 공유되는 데이터가 있는 UI , 예를 들어 정적인 블로그 게시물이나 제품 페이지 에 유용</li>
                  <li>정기적으로 업데이트되는 개인화된 데이터가 있는 대시보드에는 적합하지 않을 수 있다.</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">동적 렌더링</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>사용자가 페이지를 방문하는 시점(요청 시점) 에 서버에서 각 사용자에 맞게 콘텐츠가 렌더링</li>
                  <li>실시간 데이터 - 동적 렌더링을 통해 애플리케이션에서 실시간 또는 자주 업데이트되는 데이터를 표시할 수 있다. 이는 데이터가 자주 변경되는 애플리케이션에 이상적</li>
                  <li>사용자 맞춤형 콘텐츠 - 대시보드나 사용자 프로필과 같은 개인화된 콘텐츠를 제공하고 사용자 상호 작용에 따라 데이터를 업데이트하는 것이 더 쉽다.</li>
                  <li>요청 시간 정보 - 동적 렌더링을 통해 쿠키 또는 URL 검색 매개변수와 같이 요청 시점에만 알 수 있는 정보에 접근할 수 있다.</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">9장 스트리밍</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">Streaming</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>전체가 로드될 때까지 기다리지 않고, 준비된 UI 조각부터 순차적으로 화면에 보여주는 기술</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">loading.tsx</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>페이지 로딩 중에 보여줄 대체 UI(Skeleton UI)를 정의하는 파일</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">Suspense</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>React에서 특정 컴포넌트가 로딩 중일 때 로딩 상태를 보여주도록 감싸는 기능</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">10장 검색 및 페이지네이션 기능</p>
            <p className="text-xl">Next.js 클라이언트 훅</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">useSearchParams</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>URL의 매개변수에 접근</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">usePathname</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>현재 URL의 경로(매개변수 제외)</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">useRouter</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>클라이언트 구성 요소 내의 경로 간 이동을 프로그래밍 방식으로 가능<br /><Link href="https://nextjs.org/docs/app/api-reference/functions/use-router#userouter" target='_blank' className='underline hover:text-orange-500'>여러방법 사용...</Link></li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">input defaultValue, value</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>value : 제어 컴포넌트로 만들려면 `State` 속성을 사용해야 함.</li>
                  <li>defaultValue : 입력요소 자체 관리(네이티브)</li>
                </ul>
              </dd>
            </dl>
            <table className="border-slate-400">
              <colgroup><col className="min-w-[6.25rem]" /></colgroup>
              <thead>
                <tr>
                  <td className={twTableCell}>구분</td>
                  <td className={twTableCell}>value (제어)</td>
                  <td className={twTableCell}>defaultValue (비제어)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={twTableCell}>상태 관리</td>
                  <td className={twTableCell}>React State가 관리</td>
                  <td className={twTableCell}>DOM(브라우저)이 관리</td>
                </tr>
                <tr>
                  <td className={twTableCell}>동기화</td>
                  <td className={twTableCell}>항상 State와 일치</td>
                  <td className={twTableCell}>초기값 설정 후 동기화 안 됨</td>
                </tr>
                <tr>
                  <td className={twTableCell}>필수 요소</td>
                  <td className={twTableCell}>onChange 핸들러 필수</td>
                  <td className={twTableCell}>필수 아님</td>
                </tr>
                <tr>
                  <td className={twTableCell}>접근 방식</td>
                  <td className={twTableCell}>state 변수 직접 사용</td>
                  <td className={twTableCell}>useRef를 통해 DOM 접근</td>
                </tr>
                <tr>
                  <td className={twTableCell}>성능</td>
                  <td className={twTableCell}>입력마다 리렌더링 발생 가능</td>
                  <td className={twTableCell}>리렌더링 없이 독립적 동작</td>
                </tr>
              </tbody>
            </table>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">export default async function InvoicesTable</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>이 파일에서 가장 대표가 되는 함수</li>
                  <li>import Table from '@/app/ui/learn/invoices/table';</li>
                  <li>'Table' 이렇게 재선언 가능</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">export function InvoicesTable (default가 없음)</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>import &#123;InvoicesTable&#125;from ...</li>
                  <li>&#123;InvoicesTable&#125; 변경 불가</li>
                  <li>import &#123; InvoicesTable as Table &#125; from ...</li>
                  <li>ㄴ 이렇게 재선언 가능</li>
                  
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">11장 데이터 변형</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">FormData: get() method</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>객체 FormData내에서 주어진 키와 연결된 첫 번째 값을 반환</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">FormData: getAll() method</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>객체 FormData내에서 주어진 키와 관련된 모든 값을 반환</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">FormData: entries() method</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>메서드는 에 포함된 모든 키/값 쌍을 순회</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">zod 라이브러리</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>Type 유효성 검증(parse 사용)</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">revalidatePath from 'next/cache'</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>캐시를 지우고 서버에 새 요청을 보내는 함수</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">redirect from 'next/navigation'</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>최신 데이터를 가져 왔으니 리디렉션</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">12. 오류처리</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">error.tsx</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>경로 구간에서 발생하는 오류를 포착</li>
                  <li>사용자에게 대체 UI를 표시하기 위해 특수 파일을 사용</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">error 함수</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>이 객체는 JavaScript의 네이티브 인스턴스</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">reset 함수</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>이 함수는 오류 경계를 재설정하는 함수입니다. 이 함수가 실행되면 경로 구간을 다시 렌더링하려고 시도</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">notFound 함수</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>데이터가 없을 때 의도적으로 404</li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">13. 접근성 개선</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">eslint-plugin-jsx-a11y</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>https://www.npmjs.com/package/eslint-plugin-jsx-a11y</li>
                  <li>정적 코드의 오류만 감지</li>
                  <li>npm lint or pnpm lint</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">required 속성</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>클라이언트 측 유효성 검사</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">useActionState 훅</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>두 개의 인수를 받음: (action, initialState)</li>
                  <li>두 가지 값을 반환. [state, formAction]</li>
                </ul>
              </dd>
            </dl>
            <ul>
              <li>- customerId : null 처리 추가</li>
              <li><pre>customerId: formData.get('customerId') || "",</pre></li>
              <li>- invalid_type_error</li>
              <li><pre>z.string().min(1, 'Please select a customer.'),</pre></li>
              <li>- .enum 타입 에러</li>
              <li>라이브러리 함수라 사용해도 괜찮음</li>
              <li>z.union(or 연산자), z.literal(특정 상수값 하나)로 처리 가능</li>
            </ul>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">14. 인증</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">프록시(Proxy)</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>네트워크에서 중개 역할을 수행하는 서버 또는 프로그램</li>
                  <li>클라이언트와 서버로 네트워크를 보았을 때, 클라이언트와 서버의 직접적인 연결 대신 프록시가 중간에 위치하여 프록시에 의해 통신</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">bcrypt</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>암호 기반의 단방향 암호화 해시 함수로, 비밀번호 저장에 특화</li>
                </ul>
              </dd>
            </dl>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">자격 증명 제공자(Credentials provider)</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>사용자가 사용자 이름과 비밀번호를 사용하여 로그인할 수 있도록 함</li>
                </ul>
              </dd>
            </dl>
            <p>- 패스워드 오류로 로그인 안될 시 재설정</p>
            <ul>
              <li>비번을 생성</li>
              <li>const testHash = await bcrypt.hash('비번코드', 10);</li>
              <li>.hash 두번째 인자값은 Salt(고유 무작위값) ex).hash('135790', salt);</li>
              <li>해시 확인</li>
              <li>console.log('방금 만든 비번코드의 해시:', testHash);</li>
              <li>DB 쿼리에서 업데이트</li>
              <li>
                UPDATE users<br />SET password = '생성한 testHash' <br />WHERE email = 'user@nextmail.com';
              </li>
            </ul>
            <p>proxy.ts 파일 동작 안함.</p>
            <ul>
              <li>next.js에서 src 폴더가 있는 경우 관련 환경 파일을 src 안으로 이동</li>
              <li>없는 경우는 / 루트</li>
            </ul>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <p className="text-xl font-bold">15. 메타데이터 추가</p>
              <dl className="flex">
                <dt><span className="bg-orange-400 text-black">Metadata 함수</span> :</dt>
                <dd className="ml-1">
                  <ul>
                    <li>template: '%s | Acme Dashboard', : %s특정 페이지 제목으로 대체</li>
                  </ul>
                </dd>
              </dl>
          </div>

          <div className="w-full bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <p className="text-xl font-bold">기타</p>
            <dl className="flex">
              <dt><span className="bg-orange-400 text-black">use client</span> :</dt>
              <dd className="ml-1">
                <ul>
                  <li>브라우저의 기능(클릭, 상태 관리)이 필요하면 'use client'를 붙이고 클라이언트 전용 함수를 사용</li>
                  <li>'use client'가 없으면 기본적으로 서버 컴포넌트입니다. 여기서 useRouter 같은 훅을 쓰면 에러 발생</li>
                </ul>
              </dd>
            </dl>
          </div>
        </Masonry>
      </ResponsiveMasonry>
    </main>
  );
}