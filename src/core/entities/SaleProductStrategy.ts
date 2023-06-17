import { Restaurant } from "@core/entities/Restaurant";

export interface SaleProductStrategy {
    code: string,
    restaurant: Restaurant,
    parameters: {}
}