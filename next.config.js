/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig