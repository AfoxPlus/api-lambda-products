import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ProductTypeDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    name: string
}

const ProductTypeSchema: Schema = new Schema({
    code: {type: String, require: true},
    name: {type: String, require: true}
})

export const ProductTypeModel = mongoose.models.ProductType || mongoose.model<ProductTypeDocument>('ProductType',ProductTypeSchema,'ProductType')