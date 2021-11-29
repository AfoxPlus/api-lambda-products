import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'

const homeOffer: APIGatewayProxyHandler = async () => {
  await mongodbconnect()
  const productRepository: ProductRepository = new MongoDBProductRepository()
  const products = await productRepository.fetchHomeOffer()
  return formatJSONSuccessResponse({
    success: true,
    payload: products,
    message: "GET Appetizer by restaurant code"
  });
}

export const main = middyfy(homeOffer);