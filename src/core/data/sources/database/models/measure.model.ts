import mongoose, { Schema, Document, Types } from 'mongoose'

export interface MeasureDocument extends Document {
    _id: Types.ObjectId
    code: string,
    value: string
}

const MeasureSchema: Schema = new Schema({
    code: {type: String, require: true},
    value: {type: String, require: true}
})

export const MeasureModel = mongoose.models.Measure || mongoose.model<MeasureDocument>('Measure',MeasureSchema,'Measure')