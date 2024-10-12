import { QueryProduct } from "@core/domain/models/QueryProduct"
import { Product } from "@core/domain/entities/Product"
import { ProductType } from "@core/domain/entities/ProductType"
import { MenuBDUI } from "@core/domain/models/MenuBDUI"
export interface ProductRepository {
    remove(productCode: string): Promise<Boolean>
    save(product: Product, restaurantCode: string): Promise<Product>
    update(product: Product, restaurantCode: string): Promise<Product>
    filter(query: QueryProduct): Promise<Product[]>
    fetchAppetizer(restaurantCode: string): Promise<Product[]>
    fetchSaleOffer(restaurantCode: string): Promise<Product[]>
    fetchMenu(restaurantCode: string): Promise<Product[]>
    fetchHomeOffer(): Promise<Product[]>
    fetchProductTypes(): Promise<ProductType[]>
    searchProducts(restaurantCode: string): Promise<Product[]>
    updateShowInApp(code: string, isShowInApp: Boolean): Promise<Boolean>
    getMenuBDUI(restaurantCode:string):Promise<MenuBDUI>
}