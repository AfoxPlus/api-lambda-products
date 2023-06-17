import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import schema from '@functions/register/schema'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRegister } from '@core/repositories/models/request/ProductRegister'
import {ProductRepository} from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (context) =>  {
    await mongodbconnect()
    const poductRepository: ProductRepository = new MongoDBProductRepository()
    const products: ProductRegister[] = context.body
    const result = await poductRepository.saveAll(products)
    return formatJSONSuccessResponse({
      success: result,
      message: "Products register successful"
    });
  }

export const main = middyfy(register);