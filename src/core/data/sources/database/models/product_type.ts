import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ProductTypeDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    name: string,
    order: number
}

const ProductTypeSchema: Schema = new Schema({
    code: {type: String, require: true},
    name: {type: String, require: true},
    order: {type: Number, require: false}
})

export const ProductTypeModel = mongoose.models.ProductType || mongoose.model<ProductTypeDocument>('ProductType',ProductTypeSchema,'ProductType')