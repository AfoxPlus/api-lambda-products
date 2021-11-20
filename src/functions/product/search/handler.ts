import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import mockData from './mock.json'

const search: APIGatewayProxyHandler = async () => {
    return formatJSONSuccessResponse({
      success: true,
      payload: mockData,
      message: `Hello GET Search products by description and restaurantID`
    });
  }

export const main = middyfy(search);