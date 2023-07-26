import { ProductRepository } from '@core/repositories/ProductRepository';
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository';
import { mongodbconnect } from '@core/utils/mongodb_connection';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const productTypes: APIGatewayProxyHandler = async (context) => {
  await mongodbconnect()
  const productRepository: ProductRepository = new MongoDBProductRepository()
  const { restaurant_code } = context.queryStringParameters
  if (restaurant_code != undefined) {
    const productTypes = await productRepository.fetchProductTypes()
    return formatJSONSuccessResponse({
      success: true,
      payload: productTypes,
      message: `Get Product Types`
    });
  } else return formatJSONSuccessResponse({
    success: false,
    payload: [],
    message: `Error, restaurant_code is empty`
  });

}

export const main = middyfy(productTypes);