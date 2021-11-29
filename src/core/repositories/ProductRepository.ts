import { QueryProduct } from "@core/repositories/models/request/QueryProduct";
import { Product } from "@core/entities/Product";
import { ProductRegister } from "@core/repositories/models/request/ProductRegister";

export interface ProductRepository {
    save(product: ProductRegister): Promise<boolean>
    saveAll(products: ProductRegister[]): Promise<boolean>
    filter(query: QueryProduct): Promise<Product[]>
    fetchAppetizer(restaurantCode: string): Promise<Product[]>
    fetchSaleOffer(restaurantCode: string): Promise<Product[]>
    fetchMenu(restaurantCode: string): Promise<Product[]>
    fetchHomeOffer(): Promise<Product[]>
}