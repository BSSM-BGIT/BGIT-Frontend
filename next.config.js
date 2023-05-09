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
                destination: 'https://bgit.bssm.kro.kr/api/:path*'
            }
        ]
    }
}

module.exports = nextConfig
