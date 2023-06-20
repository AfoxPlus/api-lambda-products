import type { AWS } from '@serverless/typescript'

import filter from '@functions/filter'
import register from '@functions/register'
import appetizer from '@functions/appetizer'
import home_offer from '@functions/home_offer'
import sale_offer from '@functions/sale_offer'
import menu from '@functions/menu'
import product_type from '@functions/type'
import search from '@functions/search'

const serverlessConfiguration: AWS = {
  service: 'api-lambda-products',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline'],
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
      MONGODB: '${self:custom.env.${opt:stage}.MONGODB_URL}',
      VERSION: '${self:custom.version}',
      STAGE: '${opt:stage}',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    filter,
    register,
    appetizer,
    home_offer,
    sale_offer,
    menu,
    product_type,
    search
  },
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
