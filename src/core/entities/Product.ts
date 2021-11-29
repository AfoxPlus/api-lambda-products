import { Measure } from "@core/entities/Measure"
import { Currency } from "@core/entities/Currency"
import { ProductType } from "@core/entities/ProductType"
import { SaleProductStrategy } from "@core/entities/SaleProductStrategy"

export interface Product {
    code: string,
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    measure: Measure,
    currency: Currency,
    productType: ProductType,
    saleStrategy?: SaleProductStrategy
}