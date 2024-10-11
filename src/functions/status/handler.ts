import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda';
import { ProductStateRequest } from '@functions/status/ProductStateRequest';
import { ProductDI } from '@core/di/ProductModel';

const productTypes: ValidatedEventAPIGatewayProxyEvent<ProductStateRequest> = async (context) => {
  const productRepository = ProductDI.productRepository
  const productStatus = context.body as ProductStateRequest
  if (productStatus.code != undefined) {
    await productRepository.updateShowInApp(productStatus.code, productStatus.showInApp)
    return formatJSONSuccessResponse({
      success: true,
      payload: {},
      message: `Show in app update successful`
    });
  } else return formatJSONSuccessResponse({
    success: false,
    payload: {},
    message: `Error, product code is empty`
  });

}

export const main = middyfy(productTypes);