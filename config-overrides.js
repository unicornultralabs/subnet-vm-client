const webpack = require('webpack');

module.exports = function override(config, env) {
    // Only modify the configuration in a browser environment
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.crypto = require.resolve('crypto-browserify');
    config.resolve.fallback.stream = require.resolve('stream-browserify');
    config.resolve.fallback.buffer = require.resolve('buffer/');

    // Polyfill for 'process'
    config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
    return config;
  };
  