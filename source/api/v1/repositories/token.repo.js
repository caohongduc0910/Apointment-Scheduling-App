import Token from '../models/mysql/tokens.js'

export const getTokenByToken = async (token) => {
    const existToken = await Token.findOne({
        where: {
            token: token
        }
    })
    return existToken
}


export const getTokenByUserId= async (id) => {
    const existToken = await Token.findOne({
        where: {
            user_id: id
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


export const countTokenByUserId = async (id) => {
    const count = await Token.count({
        where: {
            user_id: id,
        }
    })
    return count
}



export const deleteTokenByUserId = async (id) => {
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
