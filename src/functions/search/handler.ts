import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'

const fetch: APIGatewayProxyHandler = async (context) => {
  await mongodbconnect()
  const productRepository: ProductRepository = new MongoDBProductRepository()
  const { restaurant_code } = context.headers
  if (restaurant_code != undefined) {
    const products = await productRepository.searchProducts(restaurant_code)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "POST search products"
    });
  } else return formatJSONSuccessResponse({
    success: false,
    payload: [],
    message: `Error, restaurant_code is empty`
  });

}

export const main = middyfy(fetch);