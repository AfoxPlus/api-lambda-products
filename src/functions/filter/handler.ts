import { formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import schema from '@functions/filter/schema'
import { ProductDI } from '@core/di/ProductModel'
import { QueryProduct } from '@core/domain/models/QueryProduct'

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (context) =>  {
    const {product_name} = context.body
    const {restaurant_code} = context.headers
    const query: QueryProduct = { product_name, restaurant_code }
    const productRepository = ProductDI.productRepository
    const products = await productRepository.filter(query)
    return formatJSONSuccessResponse({
      success: true,
      payload: products,
      message: "POST Filter products by product name and restaurant code"
    });
  }

export const main = middyfy(filter);