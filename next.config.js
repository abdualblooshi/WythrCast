/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: [
      "i.imgur.com",
      "images.unsplash.com",
      "media.giphy.com",
      "camo.githubusercontent.com",
      "dev-to-uploads.s3.amazonaws.com",
      "im2.ezgif.com",
      "user-images.githubusercontent.com",
      "openweathermap.org",
    ],
  },
};
