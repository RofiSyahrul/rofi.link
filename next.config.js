const env = require('dotenv').config().parsed || {};
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

let withBundleAnalyzer = () => () => {};
if (isAnalyze) {
  withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(pkg.version)
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
          dest: 'public'
        }
      }
    ]
  ],
  nextConfig
);