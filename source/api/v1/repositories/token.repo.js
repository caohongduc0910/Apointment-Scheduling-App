import Token from '../models/mysql/tokens.js'

const getTokenByToken = async (token) => {
    const existToken = await Token.findOne({
        where: {
            token: token
        }
    })
    return existToken
}

const getTokenByUserId= async (id) => {
    const existToken = await Token.findOne({
        where: {
            user_id: id
        }
    })
    return existToken
}

const createToken = async (token, id) => {
    await Token.create({
        token: token,
        user_id: id
    })
}

const deleteTokenByUserId = async (id) => {
    await Token.destroy({
        where: {
            user_id: id
        }
    })
}

const deleleTokenByToken = async (token) => {
    await Token.destroy({
        where: {
            token: token
        }
    })
}

export { createToken,
    getTokenByToken, 
    getTokenByUserId, 
    deleteTokenByUserId,
    deleleTokenByToken 
}