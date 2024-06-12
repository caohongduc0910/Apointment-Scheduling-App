import Token from '../models/mysql/tokens.js'

export const getTokenByToken = async (token) => {
    const existToken = await Token.findOne({
        where: {
            token: token
        }
    })
    return existToken
}


export const getTokenByUserID = async (id) => {
    const existToken = await Token.findOne({
        where: {
            user_id: id
        }
    })
    return existToken
}


export const getTokenByID = async (id) => {
    const token = await Token.findOne({
        where: {
            id: id
        },
    })
    return token
}


export const getTheFirstToken = async (userID) => {
    const lastToken = await Token.findOne({
        where: {
            user_id: userID
        },
        order: [['created_at', 'ASC']],
    })
    return lastToken
}


export const createToken = async (token, id) => {
    return await Token.create({
        token: token,
        user_id: id
    })
}


export const countTokenByUserID = async (id) => {
    const count = await Token.count({
        where: {
            user_id: id,
        }
    })
    return count
}


export const deleteTokenByUserID = async (id) => {
    await Token.destroy({
        where: {
            user_id: id
        }
    })
}


export const deleleTokenByToken = async (token) => {
    await Token.destroy({
        where: {
            token: token
        }
    })
}


export const deleleTokenByID = async (id) => {
    await Token.destroy({
        where: {
            id: id
        }
    })
}



