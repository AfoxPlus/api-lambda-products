import { QueryProduct } from "@core/repositories/models/request/QueryProduct";
import { Product } from "@core/entities/Product";
import { ProductType } from "@core/entities/ProductType";

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
}