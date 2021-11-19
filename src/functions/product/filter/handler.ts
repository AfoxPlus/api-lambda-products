import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import * as mockData from './mock.json'
import schema from './schema'

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) =>  {
    const {headers} = event
    return formatJSONSuccessResponse({
      success: true,
      headers,
      payload: mockData,
      message: "`Hello GET Filter products by description and restaurantID`"
    });
  }

export const main = middyfy(filter);