import { ProductDI } from '@core/di/ProductModel'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'

const filter: APIGatewayProxyHandler = async (context) => {
  try {
    const { code } = context.pathParameters
    const productRepository = ProductDI.productRepository
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