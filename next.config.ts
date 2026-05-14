import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
