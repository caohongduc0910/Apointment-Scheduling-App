const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  room_uuid: String,
  message: String,
  user_id: String,
  picture: Array,
  deleted_at: Date
}, {
  timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema, 'chats')

module.exports = Chat 