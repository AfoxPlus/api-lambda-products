import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const productTypes: APIGatewayProxyHandler = async (context) => {
  const productRepository = ProductDI.productRepository
  const { restaurant_code } = context.headers
  if (restaurant_code != undefined) {
    const response = await productRepository.fetchProductTypes(restaurant_code)
    return formatJSONSuccessResponse({
      success: true,
      payload: response,
      message: `Get Product Types`
    });
  } else return formatJSONSuccessResponse({
    success: false,
    payload: [],
    message: `Error, restaurant_code is empty`
  });
}

export const main = middyfy(productTypes);