const mongoose = require('mongoose')

module.exports.connectionMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected successfully to MongoDB")
  }
  catch (error) {
    console.log("Connected unsuccessfully to MongoDB")
  }
}