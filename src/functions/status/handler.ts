import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { ProductRepository } from '@core/repositories/ProductRepository';
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository';
import { mongodbconnect } from '@core/utils/mongodb_connection';
import { middyfy } from '@libs/lambda';
import { ProductStateRequest } from '@functions/status/ProductStateRequest';

const productTypes: ValidatedEventAPIGatewayProxyEvent<ProductStateRequest> = async (context) => {
  await mongodbconnect()
  const productRepository: ProductRepository = new MongoDBProductRepository()
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