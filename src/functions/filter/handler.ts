import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'
import { QueryProduct } from '@core/repositories/models/request/QueryProduct'

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (context) =>  {
    await mongodbconnect()
    const query: QueryProduct = context.body
    const productRepository: ProductRepository = new MongoDBProductRepository()
    const products = await productRepository.filter(query)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "`Hello GET Filter products by description and restaurantID`"
    });
  }

export const main = middyfy(filter);