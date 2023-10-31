/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: {
      level: "verbose", // control log level
      fullUrl: true, // console fetching url logging
    },
  },
};

module.exports = nextConfig;
