import {Schema, model} from 'mongoose'
import { randomUUID } from 'crypto'

const roomSchema = new Schema({
  uuid: {
    type: Schema.Types.UUID,
    default: () => randomUUID(),
    unique: true
  },
  name: String,
  deleted_at: Date
}, {
  timestamps: {
    createdAt: 'created_at',  
    updatedAt: 'updated_at'
  }
})

const Room = model('Room', roomSchema)

export default Room 