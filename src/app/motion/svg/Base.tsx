"use client";
import { motion } from "framer-motion";

export default function Base() {
  const pathLength = 1000;

  const mainColor = '#3b82f6';

  return(
    <div className="min-h-[100vh] bg-white">
      <div className="flex flex-wrap gap-5">
        <div className="border p-10">
          <svg width="200" height="200" viewBox="0 0 200 200" className="border border-gray-200">
            {/* (10, 10)에서 (190, 190)까지 긋는 선 */}
            <line 
              x1="10" y1="10" 
              x2="190" y2="190" 
              stroke="blue" 
              strokeWidth="4" 
            />
          </svg>
        </div>

        <div className="border p-10">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <path 
              d="M 20 100 L 180 100" 
              stroke="black"
              strokeWidth="5"
              strokeDasharray="160" 
              strokeDashoffset="160"
              className="draw-animation"
            />
            <style jsx>{`
              .draw-animation {
                animation: draw 2s forwards ease-in-out;
              }

              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </svg>
        </div>

        <div className="border p-10">
          <svg width="500" height="200" viewBox="0 0 500 200">
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="50"
              fontWeight="bold"
              fill="transparent"
              stroke="blue"
              strokeWidth="2"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength}
              className="draw-text"
            >
              strokeDashoffset
            </text>
            <style jsx>{`
              .draw-text {
                animation: drawText 3s forwards linear;
              }
              @keyframes drawText {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </svg>
        </div>

        <div className="border p-10">
          <div className="bg-gray-900">
            <svg width="500" height="200" viewBox="0 0 500 200">
              <text
                x="50%" y="50%"
                dominantBaseline="middle" textAnchor="middle"
                fontSize="60" fontWeight="bold"
                className="drawing-text-bg"
              >
                animation
              </text>
            </svg>

            <style jsx>{`
              .drawing-text-bg {
                fill: transparent;
                stroke: #3b82f6;
                stroke-width: 1.5;
                stroke-dasharray: 800;
                stroke-dashoffset: 800;
                
                animation: 
                  draw 3s forwards ease-in-out,
                  fill-in 1.5s forwards 2.5s;
              }

              @keyframes draw {
                to { stroke-dashoffset: 0; }
              }

              @keyframes fill-in {
                to {
                  fill: #3b82f6;
                  stroke: transparent;
                }
              }
            `}</style>
          </div>
        </div>

        <div className="border p-10">
          <div className="flex">
            <div className="group cursor-pointer flex flex-col items-center">
              <p className="text-gray-500">Mouse Hover</p>
              <svg width="200" height="200" viewBox="0 0 200 200" className="">
                <rect
                  x="20" y="20" width="160" height="160"
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                  strokeDasharray="640"
                  strokeDashoffset="640"
                  className="transition-all duration-700 ease-in-out group-hover:[stroke-dashoffset:0] scale-y-[-1] origin-center"
                />
                <text 
                  x="50%" y="50%" 
                  dominantBaseline="middle" textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                >
                  group-hover!
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="border p-10">
          <p className="text-gray-500">Mouse Hover</p>
          <motion.div whileHover="hover" className="cursor-pointer">
            <svg width="200" height="200">
              <motion.rect
                x="20" y="20" width="160" height="160"
                stroke="black"
                strokeWidth="4"
                fill="transparent"
                initial={{ pathLength: 0 }} // 0%
                variants={{
                  hover: { pathLength: 1 } // 100%
                }}
                transition={{ duration: 0.7 }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="border p-10">
          <svg width="600" height="200" viewBox="0 0 600 200">
            <defs>
              <filter id="wavy">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.05"
                  numOctaves="2"
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
              </filter>
            </defs>
            <text
              x="50%" y="50%"
              dominantBaseline="middle" textAnchor="middle"
              fontSize="80" fontWeight="bold" fill="#000"
              filter="url(#wavy)" /* 위에서 만든 필터를 적용 */
            >
              WAVY EFFECT
            </text>
          </svg>
        </div>

        <div className="border p-10">
          <svg width="600" height="200" viewBox="0 0 600 200">
            <defs>
              <filter id="wavy2">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.05"
                  numOctaves="2"
                >
                  {/* baseFrequency를 0.05에서 0.07로 무한 반복 변경 */}
                  <animate
                    attributeName="baseFrequency"
                    values="0.05; 0.07; 0.05"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>

                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
              </filter>
            </defs>
            <text
              x="50%" y="50%"
              dominantBaseline="middle" textAnchor="middle"
              fontSize="80" fontWeight="bold" fill="#000"
              filter="url(#wavy2)" /* 위에서 만든 필터를 적용 */
            >
              WAVY EFFECT
            </text>
          </svg>
        </div>

        <div className="border p-10">
          <div className="flex">
            <div className="group cursor-pointer flex flex-col items-center">
              <p className="text-gray-500">Mouse Hover</p>
              <svg width="200" height="200" viewBox="0 0 200 200" className="">
                <rect
                  x="20" y="20" width="160" height="160"
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                  strokeDasharray="640"
                  strokeDashoffset="640"
                  className="transition-all duration-700 ease-in-out group-hover:[stroke-dashoffset:0] scale-y-[-1] origin-center"
                />
                <filter id="wavy3">
                  <feTurbulence
                    type="turbulence"
                    baseFrequency="0.05"
                    numOctaves="2"
                    result="noise"
                  >
                    <animate
                      attributeName="baseFrequency"
                      values="0.05; 0.07; 0.05"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
                <text
                  x="50%" y="50%"
                  dominantBaseline="middle" textAnchor="middle"
                  fontSize="40" fontWeight="bold" fill="#000"
                  className="group-hover:[filter:url(#wavy3)] transition-all duration-700 ease-in-out"
                >
                  HOVER
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="border p-10">
          <motion.div whileHover="hover" className="cursor-pointer relative">
            <svg width="400" height="100" viewBox="0 0 400 100">
              <defs>
                <clipPath id="reveal-text">
                  <motion.rect 
                    x="0" y="0"
                    height="100"
                    initial={{ width: 0 }}
                    variants={{
                      hover: { width: 400 }
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </clipPath>
              </defs>
              <text
                x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                fontSize="50" fontWeight="bold" fill="#eee"
              >
                clipPath
              </text>
              <text
                x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                fontSize="50" fontWeight="bold" fill="#3b82f6"
                clipPath="url(#reveal-text)"
              >
                clipPath
              </text>
            </svg>
          </motion.div>
        </div>

        <div className="border p-10">
          <div className="flex flex-col items-center">
            <motion.div whileHover="hover" className="group cursor-pointer">
              <svg width="400" height="100" viewBox="0 0 400 100">
                <defs>
                  <clipPath id="circle-mask">
                    <motion.circle
                      cx="200" // 가로 중심
                      cy="50"  // 세로 중심
                      initial={{ r: 0 }} // 처음 반지름 0
                      variants={{
                        hover: { r: 250 }, // 
                      }}
                      transition={{ duration: 1, ease: 'circOut' }}
                    />
                  </clipPath>
                </defs>
                <text
                  x="50%" y="50%"
                  dominantBaseline="middle" textAnchor="middle"
                  fontSize="50" fontWeight="bold" fill="#eee"
                >
                  CircleText
                </text>

                {/* 실제 나타날 글자: 위에서 정의한 clipPath를 적용 */}
                <text
                  x="50%" y="50%"
                  dominantBaseline="middle" textAnchor="middle"
                  fontSize="50" fontWeight="bold" fill="#ec4899" // 핑크색
                  clipPath="url(#circle-mask)"
                >
                  CircleText
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="border p-10">
          <svg width="500" height="200" viewBox="0 0 500 200">
            <defs>
              <path id="curve" d="M 50 150 Q 250 50 450 150" fill="none" />
            </defs>
            <text fill="blue" fontSize="20">
              <textPath href="#curve">
                TextPath TextPath TextPath TextPath TextPath
                <animate 
                  attributeName="startOffset" 
                  from="0%" to="100%" 
                  dur="5s" repeatCount="indefinite" 
                />
              </textPath>
            </text>
          </svg>
        </div>

        <div className="border p-10">
          <div className="flex flex-col items-center">
            <motion.div whileHover="hover" className="group cursor-pointer rounded-2xl shadow-lg">
              <svg width="300" height="300" viewBox="0 0 300 300">
                <defs>
                  <clipPath id="fill-mask">
                    <motion.rect
                      x="25" y="25"
                      height="250"
                      initial={{ width: 0 }}
                      variants={{
                        hover: { width: 250 },
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </clipPath>
                </defs>
                <motion.rect
                  x="25" y="25" width="250" height="250"
                  rx="15"
                  stroke={mainColor}
                  strokeWidth="6"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  variants={{
                    hover: { pathLength: 1 },
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <g clipPath="url(#fill-mask)">
                  {/* 배경색 */}
                  <rect x="25" y="25" width="250" height="250" rx="15" fill={`${mainColor}10`} />
                  
                  {/* 텍스트 */}
                  <text
                    x="50%" y="50%"
                    dominantBaseline="middle" textAnchor="middle"
                    fontSize="60" fontWeight="bold" fill={mainColor}
                  >
                    FILL
                  </text>
                </g>
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="border p-10"></div>

      </div>
    </div>
  )
}