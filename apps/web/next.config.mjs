// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: true,
    styledComponents: true,
    styledJsx: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,
  // Enable SWC minification for faster builds
  swcMinify: true,
  transpilePackages: [
    "@convertium/constants",
    "@adplist/queries",
    "@adplist/services",
    "@adplist/types",
    "@convertium/ui",
    "@convertium/utils",
  ],
  // Enable page bundling for faster page loads
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  // Enable compression
  compress: true,
  // Increase performance budget
  poweredByHeader: false,
};

export default nextConfig;
