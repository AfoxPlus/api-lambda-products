import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const menu: APIGatewayProxyHandler = async (context) => {
  const {restaurant_code} = context.headers
  const productRepository = ProductDI.productRepository
  const bdui = await productRepository.getMenuBDUI(restaurant_code)
  return formatJSONSuccessResponse({
    success: true,
    payload: bdui,
    message: "GET Menu by restaurant code"
  });
}

export const main = middyfy(menu);