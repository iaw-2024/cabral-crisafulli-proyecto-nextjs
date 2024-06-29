/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'imgur.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['res.cloudinary.com'],
    },
};

module.exports = nextConfig;