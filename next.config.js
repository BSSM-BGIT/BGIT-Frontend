/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'static.solved.ac'],
    },
    reactStrictMode: true,
    swcMinify: true,
    rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://52.79.57.84:8080/:path*'
            }
        ]
    }
}

module.exports = nextConfig
