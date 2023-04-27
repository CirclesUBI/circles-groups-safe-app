/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['circles-ubi.s3.amazonaws.com', 'dolphin-app-27r5c.ondigitalocean.app']
  },
  async headers() {
    return [
      {
        // Allow requests from example.com
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://app.safe.global',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
}
