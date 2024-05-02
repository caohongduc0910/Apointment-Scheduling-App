const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const roomSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: String,
  deleted_at: Date
}, {
  timestamps: true
})

const Room = mongoose.model('Room', roomSchema, 'rooms')

module.exports = Room 