import {Schema, model} from 'mongoose'
import { randomUUID } from 'crypto'

const roomMemberSchema = new Schema({
  uuid: {
    type: Schema.Types.UUID,
    default: () => randomUUID(),
    unique: true
  },
  room_uuid: String,
  user_id: String,
  name: String,
  deleted_at: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const RoomMember = model('RoomMember', roomMemberSchema)

export default RoomMember 