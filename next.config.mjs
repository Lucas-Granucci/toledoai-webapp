/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'canvas']
  }
};
module.exports = nextConfig;
export default nextConfig;
