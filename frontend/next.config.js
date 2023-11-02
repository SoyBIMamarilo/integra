/** @type {import('next').NextConfig} */
let { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, SERVER_SESSION_SECRET, PORT, INTERNAL_TOKEN_SCOPES, PUBLIC_TOKEN_SCOPES } = process.env;
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_CALLBACK_URL || !SERVER_SESSION_SECRET) {
  console.warn('Missing some of the environment variables.');
  process.exit(1);
}
const nextConfig = {
  experimental: {
    logging: {
      level: "verbose", // control log level
      fullUrl: true, // console fetching url logging
    },
  },
};

module.exports = nextConfig;
