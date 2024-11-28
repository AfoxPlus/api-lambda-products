import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { ProductRequest } from '@functions/create_update/ProductRequest'
import { ProductDI } from '@core/di/ProductModel'
import { Product } from '@core/domain/entities/Product'

const create: ValidatedEventAPIGatewayProxyEvent<ProductRequest> = async (context) => {
  const productRepository = ProductDI.productRepository
  const productRequest = context.body as ProductRequest
  const { restaurant_code } = context.headers
  let result = null

  if (productRequest.code === undefined || productRequest.code === "" || productRequest.code == null) {
    const product: Product = {
      name: productRequest.name,
      description: productRequest.description,
      imageUrl: productRequest.imageUrl,
      stock: productRequest.stock,
      price: productRequest.price,
      productType: { id: productRequest.productType, code: "", name: "" },
      showInApp: productRequest.showInApp
    }
    result = await productRepository.save(product, restaurant_code).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err
      });
    })
  } else {
    const product: Product = {
      code: productRequest.code,
      name: productRequest.name,
      description: productRequest.description,
      imageUrl: productRequest.imageUrl,
      stock: productRequest.stock,
      price: productRequest.price,
      productType: { id: productRequest.productType, code: "", name: "" },
      showInApp: productRequest.showInApp
    }
    result = await productRepository.update(product, restaurant_code).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err
      });
    })
  }
  return formatJSONSuccessResponse({
    success: true,
    payload: result,
    message: "Successful"
  });
}

export const main = middyfy(create);