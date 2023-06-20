import mongoose, { Schema, Document, Types } from 'mongoose'
import { CurrencyDocument } from '@core/repositories/database/models/currency.model'
import { MeasureDocument } from '@core/repositories/database/models/measure.model'
import { RestaurantDocument, SaleProductStrategyDocument } from '@core/repositories/database/models/salestrategy.model'
import { ProductTypeDocument } from '@core/repositories/database/models/product_type'

export interface ProductDocument extends Document {
    _id: Types.ObjectId
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    showInApp: Boolean,
    measure: MeasureDocument,
    currency: CurrencyDocument,
    saleStrategy: SaleProductStrategyDocument,
    productType: ProductTypeDocument,
    restaurant: RestaurantDocument
}

const ProductSchema: Schema = new Schema({
    name: { type: String, require: true },
    description: String,
    imageUrl: String,
    stock: Number,
    price: { type: Number, require: true },
    showInApp: { type: Boolean, default: false },
    measure: { type: mongoose.Schema.Types.ObjectId, ref: 'Measure' },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    saleStrategy: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleProductStrategy' },
    productType: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
})

export const ProductModel = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema, 'Product')