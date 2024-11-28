import type { AWS } from '@serverless/typescript'

import filter from '@functions/filter'
import createAndUpdate from '@functions/create_update'
import appetizer from '@functions/appetizer'
import home_offer from '@functions/home_offer'
import sale_offer from '@functions/sale_offer'
import menu from '@functions/menu'
import product_type from '@functions/type'
import search from '@functions/search'
import remove from '@functions/remove'
import status from '@functions/status'
import menu_v1 from '@functions/menu/v1'
import product_type_create_update from '@functions/type/create_update'
import product_type_remove from '@functions/type/remove'

const serverlessConfiguration: AWS = {
  service: 'api-lambda-products',
  frameworkVersion: '4',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
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
    createAndUpdate,
    appetizer,
    home_offer,
    sale_offer,
    menu,
    menu_v1,
    product_type,
    search,
    remove,
    status,
    product_type_create_update,
    product_type_remove
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
      target: 'node18',
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
