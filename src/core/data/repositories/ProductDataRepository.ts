import { Product } from "@core/domain/entities/Product";
import { ProductType } from "@core/domain/entities/ProductType";
import { ProductRepository } from "@core/domain/repositories/ProductRepository";
import { QueryProduct } from "@core/domain/models/QueryProduct";
import { ProductMongoDBDataSource } from "@core/data/sources/database/ProductMongoDBDataSource";
import { MenuBDUI } from "@core/domain/models/MenuBDUI";

export class ProductDataRepository implements ProductRepository {

    constructor(private dataSource: ProductMongoDBDataSource) { }

    getMenuBDUI = async (restaurantCode: string): Promise<MenuBDUI> => {
        return await this.dataSource.getMenuBDUI(restaurantCode)
    }

    remove = async (productCode: string): Promise<Boolean> => {
        return await this.dataSource.remove(productCode)
    }
    save = async (product: Product, restaurantCode: string): Promise<Product> => {
        return await this.dataSource.save(product, restaurantCode)
    }
    update = async (product: Product, restaurantCode: string): Promise<Product> => {
        return await this.dataSource.update(product, restaurantCode)
    }
    filter = async (query: QueryProduct): Promise<Product[]> => {
        return await this.dataSource.filter(query)
    }
    fetchAppetizer = async (restaurantCode: string): Promise<Product[]> => {
        return await this.dataSource.fetchAppetizer(restaurantCode)
    }
    fetchSaleOffer = async (restaurantCode: string): Promise<Product[]> => {
        return await this.dataSource.fetchSaleOffer(restaurantCode)
    }
    fetchMenu = async (restaurantCode: string): Promise<Product[]> => {
        return await this.dataSource.fetchMenu(restaurantCode)
    }
    fetchHomeOffer = async (): Promise<Product[]> => {
        return await this.dataSource.fetchHomeOffer()
    }
    fetchProductTypes = async (restaurantCode: string): Promise<ProductType[]> => {
        return await this.dataSource.fetchProductTypes(restaurantCode)
    }
    searchProducts = async (restaurantCode: string): Promise<Product[]> => {
        return await this.dataSource.searchProducts(restaurantCode)
    }
    updateShowInApp = async (code: string, isShowInApp: Boolean): Promise<Boolean> => {
        return await this.dataSource.updateShowInApp(code, isShowInApp)
    }

}