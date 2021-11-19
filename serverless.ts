import type { AWS } from '@serverless/typescript';

import filter from '@functions/product/filter'
import strategy from '@functions/product/strategy'
import stock from '@functions/product/stock'
import search from '@functions/product/search'

const serverlessConfiguration: AWS = {
  service: 'api-nodejs-products',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: '${self:custom.profile.${opt:stage}}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      //MONGODB: '${self:custom.env.${opt:stage}.MONGODBCONNECTION}',
      //JWT_SECRET: '${self:custom.env.${opt:stage}.JWT_SECRET}',
      VERSION: '${self:custom.version}',
      STAGE: '${opt:stage}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {filter, strategy, stock, search},
  package: { individually: true },
  custom: {
    stage: '${opt:stage}',
    env: '${file(env.json)}',
    version: '1.0.0',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    profile: {
      prod: 'YaListoApp',
      dev: 'YaListoApp',
    },
  },
};

module.exports = serverlessConfiguration;
