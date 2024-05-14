import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRY } from '../config/global.js'

const createAccessToken = (id) => {
    return jwt.sign({
       id: id
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })
}

const decodeAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

export {
    createAccessToken,
    decodeAccessToken
} 
    