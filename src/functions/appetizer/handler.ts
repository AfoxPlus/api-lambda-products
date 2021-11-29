import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'

const appetizer: APIGatewayProxyHandler = async (context) => {
    await mongodbconnect()
    const {restaurant_code} = context.headers
    const productRepository: ProductRepository = new MongoDBProductRepository()
    const products = await productRepository.fetchAppetizer(restaurant_code)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "GET Appetizer by restaurant code"
    });
  }

export const main = middyfy(appetizer);