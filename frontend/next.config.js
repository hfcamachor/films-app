/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
  },
};

module.exports = nextConfig;
