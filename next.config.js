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
};
