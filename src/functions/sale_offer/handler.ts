import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const saleOffer: APIGatewayProxyHandler = async (context) => {
  const {restaurant_code} = context.headers
  const productRepository = ProductDI.productRepository
  const products = await productRepository.fetchSaleOffer(restaurant_code)
  return formatJSONSuccessResponse({
    success: true,
    payload: products,
    message: "GET Sale Offer by restaurant code"
  });
  }

export const main = middyfy(saleOffer);