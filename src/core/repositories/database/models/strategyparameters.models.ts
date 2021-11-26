import mongoose, { Schema, Document, Types } from 'mongoose'

export interface StrategyParametersDocument extends Document {
    _id: Types.ObjectId,
    percentage: Number,
    marketName: string
}

const StrategyParametersSchema: Schema = new Schema({
    percentage: {type: Number, require: true },
    marketName: String
})

export const StrategyParametersModel = mongoose.models.StrategyParameters || mongoose.model<StrategyParametersDocument>('StrategyParameters', StrategyParametersSchema, 'StrategyParameters')