/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for file uploads and PDF processing
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set to your expected maximum file size
    },
    responseLimit: '10mb',
    externalResolver: true
  },

  // Enable server components to use external packages
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'turndown'],
  },

  // For Vercel deployments (optional but recommended)
  output: process.env.VERCEL ? 'standalone' : undefined,
  
  // For Netlify deployments (optional)
  output: process.env.NETLIFY ? 'standalone' : undefined
};

export default nextConfig;