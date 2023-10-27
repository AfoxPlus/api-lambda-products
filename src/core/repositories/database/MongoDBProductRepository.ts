import { ProductRepository } from "@core/repositories/ProductRepository"
import { ProductDocument, ProductModel } from "@core/repositories/database/models/product.model"
import { Product } from "@core/entities/Product"
import { QueryProduct } from "@core/repositories/models/request/QueryProduct"
import { MeasureDocument, MeasureModel } from "@core/repositories/database/models/measure.model"
import { CurrencyModel } from "@core/repositories/database/models/currency.model"
import { SaleProductStrategyModel, RestaurantModel } from "@core/repositories/database/models/salestrategy.model"
import { ProductTypeDocument, ProductTypeModel } from "@core/repositories/database/models/product_type"
import { ProductType } from "@core/entities/ProductType"

export class MongoDBProductRepository implements ProductRepository {
    updateShowInApp = async (code: string, isShowInApp: Boolean): Promise<Boolean> => {
        try {
            await ProductModel.updateOne({ _id: code }, { showInApp: isShowInApp })
            return true
        } catch (err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    remove = async (productCode: string): Promise<Boolean> => {
        try {
            await ProductModel.findByIdAndRemove(productCode)
            return true
        } catch (err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    save = async (product: Product, restaurantCode: string): Promise<Product> => {
        try {
            const measure: MeasureDocument = await MeasureModel.findOne()
            const currency: MeasureDocument = await CurrencyModel.findOne()
            const productDocument = this.productToDocument(product, measure._id.toString(), currency._id.toString(), restaurantCode)
            const result = await ProductModel.create(productDocument)
            return this.documentToProduct(result)
        } catch (err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    update = async (product: Product, restaurantCode: string): Promise<Product> => {
        try {
            const measure: MeasureDocument = await MeasureModel.findOne()
            const currency: MeasureDocument = await CurrencyModel.findOne()
            const productDocument = this.productToDocument(product, measure._id.toString(), currency._id.toString(), restaurantCode)
            const result = await ProductModel.findOneAndUpdate({ _id: product.code }, productDocument)
            return this.documentToProduct(result)
        } catch (err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    searchProducts = async (restaurantCode: string): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ restaurant: restaurantCode }).
                populate({ path: 'productType', model: ProductTypeModel })
            const products: Product[] = this.documentsToProducts(productDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchProductTypes = async (): Promise<ProductType[]> => {
        try {
            const productTypesDocuments: ProductTypeDocument[] = await ProductTypeModel.find()
            const result: ProductType[] = productTypesDocuments.map((document) => ({
                id: document._id.toString(),
                name: document.name
            }))
            return result
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchAppetizer = async (restaurantCode: string): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ showInApp: true, restaurant: restaurantCode }).
                populate({ path: 'measure', model: MeasureModel }).
                populate({ path: 'currency', model: CurrencyModel }).
                populate({ path: 'productType', model: ProductTypeModel })
            const filterDocuments = productDocuments.filter((document) => document.productType.code === "PRODUCT_APPETIZER")
            const products: Product[] = this.documentsWithOutStrategyToProducts(filterDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchSaleOffer = async (restaurantCode: string): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ showInApp: true, restaurant: restaurantCode }).
                populate({ path: 'measure', model: MeasureModel }).
                populate({ path: 'currency', model: CurrencyModel }).
                populate({
                    path: 'saleStrategy', model: SaleProductStrategyModel,
                    populate: { path: 'restaurant', model: RestaurantModel, select: 'name' }
                }).
                populate({ path: 'productType', model: ProductTypeModel })
            const filterDocuments = productDocuments.filter((document) => document.productType.code === "PRODUCT_OFFER")
            const products: Product[] = this.documentsWithStrategyToProducts(filterDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchMenu = async (restaurantCode: string): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ showInApp: true, restaurant: restaurantCode }).
                populate({ path: 'measure', model: MeasureModel }).
                populate({ path: 'currency', model: CurrencyModel }).
                populate({ path: 'productType', model: ProductTypeModel })
            const filterDocuments = productDocuments.filter((document) => document.productType.code === "PRODUCT_MENU")
            const products: Product[] = this.documentsWithOutStrategyToProducts(filterDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchHomeOffer = async (): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ showInApp: true }).
                populate({ path: 'measure', model: MeasureModel }).
                populate({ path: 'currency', model: CurrencyModel }).
                populate({
                    path: 'saleStrategy', model: SaleProductStrategyModel,
                    populate: { path: 'restaurant', model: RestaurantModel, select: 'name' }
                }).
                populate({ path: 'productType', model: ProductTypeModel })
            const filterDocuments = productDocuments.filter((document) => document.productType.code === "PRODUCT_HOME_OFFER")
            const products: Product[] = this.documentsWithStrategyToProducts(filterDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    filter = async (query: QueryProduct): Promise<Product[]> => {
        try {
            const productDocuments: ProductDocument[] = await ProductModel.find({ showInApp: true, restaurant: query.restaurant_code, name: { $regex: '.*' + query.product_name + '.*' } }).
                populate({ path: 'measure', model: MeasureModel }).
                populate({ path: 'currency', model: CurrencyModel }).
                populate({ path: 'productType', model: ProductTypeModel })
            const filterDocuments = productDocuments.filter((document) => document.productType.code === "PRODUCT_SALE")
            const products: Product[] = this.documentsWithOutStrategyToProducts(filterDocuments)
            return products
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    private documentsWithStrategyToProducts(productDocuments: ProductDocument[]): Product[] {
        const products: Product[] = productDocuments.map((document) => ({
            code: document._id.toString(),
            name: document.name,
            description: document.description,
            imageUrl: document.imageUrl,
            stock: document.stock,
            price: document.price,
            showInApp: document.showInApp,
            measure: { code: document.measure.code, value: document.measure.value },
            currency: { code: document.currency.code, value: document.currency.value },
            productType: { code: document.productType.code, name: document.productType.name },
            saleStrategy: {
                code: document.saleStrategy.code,
                restaurant: { code: document.saleStrategy.restaurant._id.toString(), name: document.saleStrategy.restaurant.name },
                parameters: document.saleStrategy.parameters
            }
        }))
        return products
    }

    private documentsWithOutStrategyToProducts(productDocuments: ProductDocument[]): Product[] {
        const products: Product[] = productDocuments.map((document) => ({
            code: document._id.toString(),
            name: document.name,
            description: document.description,
            imageUrl: document.imageUrl,
            stock: document.stock,
            price: document.price,
            showInApp: document.showInApp,
            measure: { code: document.measure.code, value: document.measure.value },
            currency: { code: document.currency.code, value: document.currency.value },
            productType: { code: document.productType.code, name: document.productType.name }
        }))
        return products
    }

    private documentsToProducts(productDocuments: ProductDocument[]): Product[] {
        const products: Product[] = productDocuments.map((document) => this.documentToProduct(document))
        return products
    }

    private documentToProduct(productDocument: ProductDocument): Product {
        const product: Product = {
            code: productDocument._id.toString(),
            name: productDocument.name,
            description: productDocument.description,
            imageUrl: productDocument.imageUrl,
            stock: productDocument.stock,
            price: productDocument.price,
            showInApp: productDocument.showInApp,
            productType: { code: productDocument.productType._id.toString(), name: productDocument.productType.name }
        }
        return product
    }


    private productToDocument(product: Product, measureCode: string, currencyCode: string, restaurantCode: string): any {
        return {
            _id: product.code,
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl,
            stock: product.stock,
            price: product.price,
            showInApp: product.showInApp,
            measure: measureCode,
            currency: currencyCode,
            productType: product.productType.id,
            restaurant: restaurantCode
        }
    }
}