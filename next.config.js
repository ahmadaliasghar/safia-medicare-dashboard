/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.kfcpakistan.com', 'res.cloudinary.com'], 
      },
      typescript: {
        ignoreBuildErrors: true
      }
}

module.exports = nextConfig
