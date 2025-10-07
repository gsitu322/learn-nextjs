import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore problematic files from node-pre-gyp
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules\/@mapbox\/node-pre-gyp/,
      use: "ignore-loader",
    });

    // Ignore problematic modules that aren't needed in the browser
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        "aws-sdk": "commonjs aws-sdk",
        "mock-aws-s3": "commonjs mock-aws-s3",
        nock: "commonjs nock",
        "node-gyp": "commonjs node-gyp",
        npm: "commonjs npm",
      });
    }

    // Set fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Ignore specific problematic files
    config.resolve.alias = {
      ...config.resolve.alias,
      "aws-sdk": false,
      "mock-aws-s3": false,
      nock: false,
    };

    return config;
  },
};

export default nextConfig;
