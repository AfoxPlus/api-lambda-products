import { Measure } from "@core/domain/entities/Measure"
import { Currency } from "@core/domain/entities/Currency"
import { ProductType } from "@core/domain/entities/ProductType"
import { SaleProductStrategy } from "@core/domain/entities/SaleProductStrategy"

export interface Product {
    code?: string,
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    measure?: Measure,
    currency?: Currency,
    productType: ProductType,
    showInApp: Boolean,
    saleStrategy?: SaleProductStrategy
}