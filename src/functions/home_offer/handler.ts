import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const homeOffer: APIGatewayProxyHandler = async () => {
  const productRepository = ProductDI.productRepository
  const products = await productRepository.fetchHomeOffer()
  return formatJSONSuccessResponse({
    success: true,
    payload: products,
    message: "GET Appetizer by restaurant code"
  });
}

export const main = middyfy(homeOffer);