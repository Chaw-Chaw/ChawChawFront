module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://mylifeforcoding.com/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: [
      "d2anzi03nvjlav.cloudfront.net",
      "mylifeforcoding.com",
      "d2anzi03nvjlav.cloudfront.net",
    ],
  },
};
