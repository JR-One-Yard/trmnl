/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  experimental: {
    useCache: true,
  },
};

module.exports = nextConfig;
