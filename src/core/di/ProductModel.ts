import { ProductDataRepository } from "@core/data/repositories/ProductDataRepository";
import { ProductMongoDBDataSource } from "@core/data/sources/database/ProductMongoDBDataSource";
import { ProductRepository } from "@core/domain/repositories/ProductRepository";
import { mongodbconnect } from '@utils/mongodb_connection'

class ProductModule {
    productRepository: ProductRepository

    constructor() {
        mongodbconnect()
        const dataSource: ProductMongoDBDataSource = new ProductMongoDBDataSource()
        this.productRepository = new ProductDataRepository(dataSource)
    }
}

export const ProductDI = new ProductModule()