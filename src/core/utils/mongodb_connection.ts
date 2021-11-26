import { connect } from 'mongoose'
export const mongodbconnect = async (): Promise<void> => {
  const { MONGODB } = process.env
  await connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log(`MONGODB_URL: ${MONGODB}`)
}
