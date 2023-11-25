import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'

const filter: APIGatewayProxyHandler = async (context) => {
  try {

    await mongodbconnect()

    const { code } = context.pathParameters
    const productRepository: ProductRepository = new MongoDBProductRepository()
    await productRepository.remove(code)

    return formatJSONSuccessResponse({
      success: true,
      payload: { code: code },
      message: "Product remove successful"
    });

  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: "Product remove error"
    });
  }

}

export const main = middyfy(filter);