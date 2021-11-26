import mongoose, { Schema, Document, Types } from 'mongoose'
import { CurrencyDocument } from '@core/repositories/database/models/currency.model'
import { MeasureDocument } from '@core/repositories/database/models/measure.model'
import { SaleProductStrategyDocument } from '@core/repositories/database/models/salestrategy.model'

export interface ProductDocument extends Document {
    _id: Types.ObjectId
    name: string,
    description: string,
    imageUrl: string,
    stock: Number,
    price: Number,
    measure: MeasureDocument,
    currency: CurrencyDocument,
    saleStrategy: SaleProductStrategyDocument
}

const ProductSchema: Schema = new Schema({
    name : {type: String, require: true}, 
    description : String,
    imageUrl : String,
    stock : Number,
    price: {type: Number, require: true},
    measure: { type: mongoose.Schema.Types.ObjectId, ref: 'Measure' },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    saleStrategy: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleProductStrategy'}
})

export const ProductModel = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema, 'Product')