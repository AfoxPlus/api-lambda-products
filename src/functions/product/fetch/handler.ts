import { formatJSONErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import {default as mockData} from "./mock.json"

const fetch: APIGatewayProxyHandler = async () => {
    return formatJSONErrorResponse({
      success: true,
      payload: mockData,
      message: `Hello GET Fetch products by description and restaurantID`
    });
  }

export const main = middyfy(fetch);