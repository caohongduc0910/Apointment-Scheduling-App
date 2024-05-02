const mongoose = require('mongoose')

const roomMemberSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  room_uuid: String,
  user_id: String,
  name: String,
  deleted_at: Date
}, {
  timestamps: true
})

const RoomMember = mongoose.model('RoomMember', roomMemberSchema, 'room_members')

module.exports = RoomMember 