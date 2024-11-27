import { ProductDI } from '@core/di/ProductModel';
import { formatJSONSuccessResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ProductTypeResponse } from '@functions/type/ProductTypeResponse';

const productTypes: APIGatewayProxyHandler = async (context) => {
  const productRepository = ProductDI.productRepository
  const { restaurant_code } = context.headers
  if (restaurant_code != undefined) {
    const productTypes = await productRepository.fetchProductTypes(restaurant_code)
    const response: ProductTypeResponse[] = productTypes.map((item) => ({ id: item.id, tag_code: item.tagCode, name: item.name, description: item.description }))
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