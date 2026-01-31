/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/contact',
        destination: 'https://formspree.io/f/YOUR_FORM_ID', // Reemplazar con tu Form ID
      },
    ];
  },
};

module.exports = nextConfig;
