import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import mockData from './mock.json'
import schema from './schema'
import { mongodbconnect } from '@core/utils/mongodb_connection'

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () =>  {
    await mongodbconnect()
    return formatJSONSuccessResponse({
      success: true,
      payload: mockData,
      message: "`Hello GET Filter products by description and restaurantID`"
    });
  }

export const main = middyfy(filter);