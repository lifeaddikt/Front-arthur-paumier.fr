/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'back.arthur-paumier.fr',
      'localhost',
    ],
  },
}

module.exports = withPlaiceholder(nextConfig)
