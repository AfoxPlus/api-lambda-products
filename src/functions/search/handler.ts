import { ProductDI } from '@core/di/ProductModel'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'

const fetch: APIGatewayProxyHandler = async (context) => {
  const productRepository = ProductDI.productRepository
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