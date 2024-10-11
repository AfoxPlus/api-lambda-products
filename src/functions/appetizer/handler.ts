import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const appetizer: APIGatewayProxyHandler = async (context) => {
    const {restaurant_code} = context.headers
    const productRepository = ProductDI.productRepository
    const products = await productRepository.fetchAppetizer(restaurant_code)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "GET Appetizer by restaurant code"
    });
  }

export const main = middyfy(appetizer);