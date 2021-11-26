import { ProductRegister } from "@core/entities/ProductRegister";

export interface ProductRepository {
    save(product: ProductRegister): Promise<boolean>
    saveAll(products: ProductRegister[]): Promise<boolean>
}