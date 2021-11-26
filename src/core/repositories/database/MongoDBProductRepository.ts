import { ProductRegister } from "@core/entities/ProductRegister"
import { ProductRepository } from "@core/repositories/ProductRepository"
import { ProductModel } from "@core/repositories/database/models/product.model"

export class MongoDBProductRepository implements ProductRepository {
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