import mongoose, { Schema, Document, Types } from 'mongoose'
import { RestaurantDocument } from '@core/data/sources/database/models/salestrategy.model'

export interface ProductTypeDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    name: string,
    order: number,
    sectionBackgroundToken: string,
    sectionColorToken: string,
    gridColumnSize: number,
    restaurant: RestaurantDocument
}

const ProductTypeSchema: Schema = new Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    order: { type: Number, require: false },
    gridColumnSize: { type: Number, require: false },
    sectionBackgroundToken: { type: String },
    sectionColorToken: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
})

export const ProductTypeModel = mongoose.models.ProductType || mongoose.model<ProductTypeDocument>('ProductType', ProductTypeSchema, 'ProductType')