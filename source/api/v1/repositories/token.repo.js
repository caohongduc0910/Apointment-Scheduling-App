import Token from '../models/mysql/tokens.js'

const getTokenByToken = async (token) => {
    const existToken = await Token.findOne({
        where: {
            token: token
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


const deleleTokenByToken = async (token) => {
    await Token.destroy({
        where: {
            token: token
        }
    })
}

export { createToken,
    getTokenByToken, 
    deleleTokenByToken 
}