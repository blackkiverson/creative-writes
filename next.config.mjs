/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      ...config.resolve.fallback
    }
    return config;
  } 
  
}

export default nextConfig
