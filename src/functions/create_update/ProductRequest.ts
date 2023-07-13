export interface ProductRequest {
    code?: string,
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    measure?: string,
    currency?: string,
    productType: string,
    showInApp: Boolean
}