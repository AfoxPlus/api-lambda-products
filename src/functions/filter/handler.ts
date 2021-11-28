import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import schema from '@functions/filter/schema'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'
import { QueryProduct } from '@core/repositories/models/request/QueryProduct'

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (context) =>  {
    await mongodbconnect()
    const {product_name} = context.body
    const {restaurant_code} = context.headers
    const query: QueryProduct = { product_name, restaurant_code }
    const productRepository: ProductRepository = new MongoDBProductRepository()
    const products = await productRepository.filter(query)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "POST Filter products by product name and restaurant code"
    });
  }

export const main = middyfy(filter);