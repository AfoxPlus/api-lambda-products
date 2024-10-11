import { Restaurant } from "@core/domain/entities/Restaurant";

export interface SaleProductStrategy {
    code: string,
    restaurant: Restaurant,
    parameters: {}
}