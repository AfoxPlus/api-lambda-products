import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { ProductRepository } from '@core/repositories/ProductRepository'
import { MongoDBProductRepository } from '@core/repositories/database/MongoDBProductRepository'
import { ProductRequest } from '@functions/create_update/ProductRequest'
import { Product } from '@core/entities/Product'

const create: ValidatedEventAPIGatewayProxyEvent<ProductRequest> = async (context) => {
  await mongodbconnect()
  const poductRepository: ProductRepository = new MongoDBProductRepository()
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
      productType: { id: productRequest.productType },
      showInApp: productRequest.showInApp
    }
    result = await poductRepository.save(product, restaurant_code)
  } else {
    const product: Product = {
      code: productRequest.code,
      name: productRequest.name,
      description: productRequest.description,
      imageUrl: productRequest.imageUrl,
      stock: productRequest.stock,
      price: productRequest.price,
      productType: { id: productRequest.productType },
      showInApp: productRequest.showInApp
    }
    await poductRepository.update(product, restaurant_code)
    result = product
  }
  return formatJSONSuccessResponse({
    success: result,
    message: "Successful"
  });
}

export const main = middyfy(create);