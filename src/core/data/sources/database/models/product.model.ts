import mongoose, { Schema, Document, Types } from 'mongoose'
import { MeasureDocument } from '@core/data/sources/database/models/measure.model'
import { CurrencyDocument } from '@core/data/sources/database/models/currency.model'
import { ProductTypeDocument } from '@core/data/sources/database/models/product_type'
import { SaleProductStrategyDocument, RestaurantDocument } from '@core/data/sources/database/models/salestrategy.model'

export interface ProductDocument extends Document {
    _id: Types.ObjectId
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    showInApp: Boolean,
    measure?: MeasureDocument,
    currency?: CurrencyDocument,
    saleStrategy?: SaleProductStrategyDocument,
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