/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
                destination: `${API_BASE_URL}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
