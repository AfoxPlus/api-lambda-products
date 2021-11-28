import mongoose, { Schema, Document, Types } from 'mongoose'

export interface RestaurantDocument extends Document {
    _id: Types.ObjectId,
    name: string
}

const RestaurantSchema = new Schema({ name : {type: String}})

export const RestaurantModel = mongoose.models.Restaurant 
|| mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema, 'Restaurant')
export interface SaleProductStrategyDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    restaurant: RestaurantDocument,
    parameters: { percentage: Number }
}

const SaleProductStrategySchema = new Schema({
    code : {type: String, require: true},
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    parameters: { percentage: { type: Number} }
})

export const SaleProductStrategyModel = mongoose.models.SaleProductStrategy 
|| mongoose.model<SaleProductStrategyDocument>('SaleProductStrategy', SaleProductStrategySchema, 'SaleProductStrategy')