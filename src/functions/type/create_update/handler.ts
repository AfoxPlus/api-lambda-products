import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { ProductDI } from '@core/di/ProductModel'
import { ProductTypeRequest } from '@functions/type/create_update/ProductTypeRequest'
import { ProductType } from '@core/domain/entities/ProductType'

const typeInsert: ValidatedEventAPIGatewayProxyEvent<ProductTypeRequest> = async (context) => {
  const productRepository = ProductDI.productRepository
  const productTypeRequest = context.body as ProductTypeRequest
  const { restaurant_code } = context.headers

  const productType: ProductType = {
    id: productTypeRequest.id,
    code: productTypeRequest.code,
    name: productTypeRequest.name,
    description: productTypeRequest.description,
  }

  if (productType.id === undefined || productType.id === "" || productType.id == null) {
    const result = await productRepository.saveProductType(productType, restaurant_code).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err
      });
    })

    return formatJSONSuccessResponse({
      success: true,
      payload: result,
      message: "Categoría guardada con éxito."
    });

  } else {
    const result = await productRepository.updateProductType(productType).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err
      });
    })

    return formatJSONSuccessResponse({
      success: true,
      payload: result,
      message: "Categoría modificada con éxito."
    });
  }

}

export const main = middyfy(typeInsert);