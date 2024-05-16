import Token from '../models/mysql/tokens.js'

export const getTokenByToken = async (token) => {
    const existToken = await Token.findOne({
        where: {
            token: token
        }
    })
    return existToken
}

export const createToken = async (token, id) => {
    await Token.create({
        token: token,
        user_id: id
    })
}


export const deleleTokenByToken = async (token) => {
    await Token.destroy({
        where: {
            token: token
        }
    })
}

export const countTokenByUserId = async (id) => {
    const count = await Token.count({
        user_id: id,
    })
    return count
}