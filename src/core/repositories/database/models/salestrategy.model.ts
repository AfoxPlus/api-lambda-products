import mongoose, { Schema, Document, Types } from 'mongoose'
import { StrategyParametersDocument } from '@core/repositories/database/models/strategyparameters.models';

export interface SaleProductStrategyDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    parameters: StrategyParametersDocument
}

const SaleProductStrategySchema = new Schema({
    code : {type: String, require: true},
    parameters: { type: mongoose.Schema.Types.ObjectId, ref: 'StrategyParameters' }
})

export const SaleProductStrategyModel = mongoose.models.SaleProductStrategy || mongoose.model<SaleProductStrategyDocument>('SaleProductStrategy', SaleProductStrategySchema, 'SaleProductStrategy')