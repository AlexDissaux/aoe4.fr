const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  externals: {
    '@nestjs/microservices': 'commonjs2 @nestjs/microservices',
    '@nestjs/websockets': 'commonjs2 @nestjs/websockets',
    '@nestjs/platform-socket.io': 'commonjs2 @nestjs/platform-socket.io',
  },
  resolve: {
    alias: {
      src: join(__dirname, 'src'),
    },
  },
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
