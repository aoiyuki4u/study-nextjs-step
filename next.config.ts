import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    // ⚠️ 빌드 시 타입 에러가 있어도 버셀 배포를 강제로 진행하도록 허용합니다.
    ignoreBuildErrors: true,
  },
};
module.exports = {
  images: {
    // remotePatterns: [new URL('https://picsum.photos/**')],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'www.hyundai.com', pathname: '/**', },
    ],
  },
};


export default nextConfig;
