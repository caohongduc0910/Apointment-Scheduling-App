import User from '../models/mysql/users.js'

export const getUserByUsername = async (username, role) => {
    const user = await User.findOne({
        where: {
            username: username,
            role_id: role
        }
    })
    return user
}


export const createUser = async (newUser) => {
    await User.create(newUser)
    return newUser
}


export const updateUserStatus = async (id) => {
    await User.update({
        status: 1
    }, {
        where: {
            id: id
        }
    })
}