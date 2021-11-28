import { ProductRegister } from "@core/repositories/models/request/ProductRegister"
import { ProductRepository } from "@core/repositories/ProductRepository"
import { ProductDocument, ProductModel } from "@core/repositories/database/models/product.model"
import { Product } from "@core/entities/Product"
import { QueryProduct } from "@core/repositories/models/request/QueryProduct"
import { MeasureModel } from "@core/repositories/database/models/measure.model"
import { CurrencyModel } from "@core/repositories/database/models/currency.model"
import { SaleProductStrategyModel, RestaurantModel } from "@core/repositories/database/models/salestrategy.model"
import { ProductTypeModel } from "@core/repositories/database/models/product_type"

export class MongoDBProductRepository implements ProductRepository {

    filter = async (query: QueryProduct): Promise<Product[]> =>  {
        try {
            const productDocuments: ProductDocument[] = await  ProductModel.find({restaurant: query.restaurant_code, name: { $regex: '.*' + query.product_name + '.*' } }).
            populate({ path: 'measure', model: MeasureModel}).
            populate({ path: 'currency', model: CurrencyModel}).
            populate({ path: 'saleStrategy', model: SaleProductStrategyModel, 
                populate: { path: 'restaurant', model: RestaurantModel, select: 'name' } }).
            populate({ path: 'productType', model: ProductTypeModel})
            const products: Product[] = productDocuments.map((document)=> ({
                code: document._id.toString(),
                name: document.name,
                description: document.description,
                imageUrl: document.imageUrl,
                stock: document.stock,
                price: document.price,
                measure: {code: document.measure.code, value: document.measure.value},
                currency: {code: document.currency.code, value: document.currency.value},
                productType: {code: document.productType.code, name: document.productType.name},
                saleStrategy: {   
                    code: document.saleStrategy.code,
                    restaurant: {code: document.saleStrategy.restaurant._id.toString(), name: document.saleStrategy.restaurant.name},
                    parameters: document.saleStrategy.parameters }
            }))
            return products
        }catch(err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    save = async(product: ProductRegister): Promise<boolean> => {
        try {
            await ProductModel.create(product)
            return true
        }catch(err) {
            throw new Error("Internal Error");
        }
    }

    saveAll = async(products: ProductRegister[]): Promise<boolean> => {
        try {
            await ProductModel.insertMany(products)
            return true
        }catch(err) {
            throw new Error("Internal Error");
        }
    }

}