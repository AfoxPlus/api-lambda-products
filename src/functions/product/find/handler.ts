import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import * as mockData from './mock.json'

const find: APIGatewayProxyHandler = async () => {
    return formatJSONSuccessResponse({
      success: true,
      payload: {...mockData},
      message: `Hello GET Find products by description and restaurantID`
    });
  }

export const main = middyfy(find);