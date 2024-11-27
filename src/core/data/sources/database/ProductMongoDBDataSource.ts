import { Product } from "@core/domain/entities/Product"
import { ProductType } from "@core/domain/entities/ProductType"
import { QueryProduct } from "@core/domain/models/QueryProduct"
import { CurrencyModel } from "@core/data/sources/database/models/currency.model"
import { MeasureDocument, MeasureModel } from "@core/data/sources/database/models/measure.model"
import { ProductModel, ProductDocument } from "@core/data/sources/database/models/product.model"
import { ProductTypeModel, ProductTypeDocument } from "@core/data/sources/database/models/product_type"
import { SaleProductStrategyModel, RestaurantModel } from "@core/data/sources/database/models/salestrategy.model"
import { EstablishmentSection, MenuBDUI } from "@core/domain/models/MenuBDUI"
import { Measure } from "@core/domain/entities/Measure"
import { Currency } from "@core/domain/entities/Currency"


export class ProductMongoDBDataSource {

    getMenuBDUI = async (restaurantCode: string): Promise<MenuBDUI> => {
        try {
            const productsType = await ProductTypeModel.find({ restaurant: restaurantCode }).sort({ order: 1 });

            const productDocuments = await ProductModel.find({ showInApp: true, restaurant: restaurantCode })
                .populate({ path: 'measure', model: MeasureModel })
                .populate({ path: 'currency', model: CurrencyModel })
                .populate({ path: 'productType', model: ProductTypeModel });

            const productsMap = new Map<string, ProductDocument[]>();
            productDocuments.forEach(doc => {
                const typeId = doc.productType._id.toString();
                if (!productsMap.has(typeId)) {
                    productsMap.set(typeId, []);
                }
                productsMap.get(typeId)?.push(doc);
            });

            const establishmentSection: EstablishmentSection[] = productsType.map(item => {
                const filteredProducts = productsMap.get(item._id.toString()) || [];
                if (filteredProducts.length > 0) {
                    return {
                        sectionName: item.name,
                        sectionBackgroundToken: item.sectionBackgroundToken,
                        sectionColorToken: item.sectionColorToken,
                        productCardViewType: this.getCardViewType(item.gridColumnSize),
                        productGridColumnSize: item.gridColumnSize,
                        products: this.documentsWithOutStrategyToProducts(filteredProducts)
                    };
                }
                return null;
            }).filter(section => section !== null);

            const menuBDUI: MenuBDUI = {
                establishmentSection
            };

            return menuBDUI;

        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    private getCardViewType(gridColum): string {
        if (gridColum > 1) {
            return "VERTICAL"
        } else {
            return "HORIZONTAL"
        }
    }

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
            const productResult = await ProductModel.create(productDocument)
            const result = await ProductModel.findById({ _id: productResult._id })
                .populate({ path: 'productType', model: ProductTypeModel })
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
            const result = await ProductModel.findByIdAndUpdate({ _id: product.code }, productDocument, { new: true })
                .populate({ path: 'productType', model: ProductTypeModel })
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

    fetchProductTypes = async (restaurantCode: string): Promise<ProductType[]> => {
        try {
            const productTypesDocuments: ProductTypeDocument[] = await ProductTypeModel.find({ restaurant: restaurantCode }).sort({ order: 1 });
            const result: ProductType[] = productTypesDocuments.map((document) => ({
                id: document._id.toString(),
                code: document.code,
                name: document.name,
                description: document.description ?? ''
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
            measure: this.getMeasureFromDocument(document),
            currency: this.getCurrencyFromDocument(document),
            productType: this.getProductTypeFromDocument(document),
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
            measure: this.getMeasureFromDocument(document),
            currency: this.getCurrencyFromDocument(document),
            productType: this.getProductTypeFromDocument(document)
        }))
        return products
    }

    private getMeasureFromDocument(document: ProductDocument): Measure {
        const measure: Measure = { code: document.measure.code, value: document.measure.value }
        return measure
    }

    private getCurrencyFromDocument(document: ProductDocument): Currency {
        const currency: Currency = { code: document.currency.code, value: document.currency.value }
        return currency
    }

    private getProductTypeFromDocument(document: ProductDocument): ProductType {
        const productType: ProductType = { code: document.productType.code, name: document.productType.name }
        return productType
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