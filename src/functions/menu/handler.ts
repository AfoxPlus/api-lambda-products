import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const menu: APIGatewayProxyHandler = async (context) => {
  const {restaurant_code} = context.headers
  const productRepository = ProductDI.productRepository
  const products = await productRepository.fetchMenu(restaurant_code)
  return formatJSONSuccessResponse({
    success: true,
    payload: products,
    message: "GET Menu by restaurant code"
  });
}

export const main = middyfy(menu);