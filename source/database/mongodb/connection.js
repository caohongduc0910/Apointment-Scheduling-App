import mongoose from 'mongoose'
import {MONGO_URL} from '../../config/global.js'

export const connectionMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log("Connected successfully to MongoDB")
  }
  catch (error) {
    console.log("Connected unsuccessfully to MongoDB")
  }
}