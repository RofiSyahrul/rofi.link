const env = require('dotenv').config().parsed || {};
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

let withBundleAnalyzer = () => () => { };
if (isAnalyze) {
  withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
}

const googleImageDomains = Array.from(
  { length: 30 },
  (_, i) => `lh${i + 1}.googleusercontent.com`
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: [
      ...googleImageDomains
    ]
  },
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        AUTHOR_NAME: JSON.stringify(pkg.author.name),
        AUTHOR_URL: JSON.stringify(pkg.author.url),
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version),
        'process.env.APP_URL': JSON.stringify(process.env.APP_URL),
        'process.env.PORT': JSON.stringify(process.env.PORT),
        'process.env.F_PROJECT_ID': JSON.stringify(process.env.F_PROJECT_ID),
        'process.env.F_API_KEY': JSON.stringify(process.env.F_API_KEY),
        'process.env.F_APP_ID': JSON.stringify(process.env.F_APP_ID),
        'process.env.F_MESSAGING_SENDER_ID': JSON.stringify(process.env.F_MESSAGING_SENDER_ID)
      })
    );

    return config;
  }
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [
      withPWA,
      {
        pwa: {
          disable: !isProd,
          dest: 'public',
          runtimeCaching,
          buildExcludes: [/middleware-manifest\.json$/]
        }
      }
    ]
  ],
  nextConfig
);
