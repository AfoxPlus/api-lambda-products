import { ProductDI } from '@core/di/ProductModel'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'

const remove: APIGatewayProxyHandler = async (context) => {
  try {
    const { id } = context.pathParameters
    const productRepository = ProductDI.productRepository
    await productRepository.removeProductType(id)

    return formatJSONSuccessResponse({
      success: true,
      payload: { id: id },
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

export const main = middyfy(remove);