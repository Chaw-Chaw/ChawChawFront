module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://chawchaw.xyz/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: [
      "chawchaw.xyz",
      "d33npzp50pk5wn.cloudfront.net",
      "k.kakaocdn.net",
      "platform-lookaside.fbsbx.com",
    ],
  },
};
