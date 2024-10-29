import { Product } from "@core/domain/entities/Product"

export interface MenuBDUI {
    establishment?: string
    establishmentType?: string
    establishmentSection: EstablishmentSection[]
}

export interface EstablishmentSection {
    sectionName: string
    sectionBackgroundToken: string
    sectionColorToken: string
    productCardViewType: string
    productGridColumnSize: number
    products: Product[]
}