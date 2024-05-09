import {Schema, model} from 'mongoose'
import { randomUUID } from 'crypto'

const chatSchema = new Schema({
  uuid: {
    type: Schema.Types.UUID,
    default: () => randomUUID(),
    unique: true
  },
  room_uuid: String,
  message: String,
  user_id: String,
  picture: Array,
  deleted_at: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Chat = model('Chat', chatSchema)

export default Chat 