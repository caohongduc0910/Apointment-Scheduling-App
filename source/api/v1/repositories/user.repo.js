import User from '../models/mysql/users.js'
import Role from '../models/mysql/roles.js'

export const getUserByID = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        },
        attributes: { exclude: ['id', 'password', 'uuid'] },
        include: {
            model: Role,
            as: 'role',
            attributes: { exclude: ['id', 'uuid'] },
        }
    })
    return user
}


export const getUserByUUID = async (uuid) => {
    const user = await User.findOne({
        where: {
            uuid: uuid,
        },
        attributes: { exclude: ['id', 'password', 'uuid'] },
        include: {
            model: Role,
            as: 'role',
            attributes: { exclude: ['id', 'uuid'] },
        }
    })
    return user
}


export const getUserByUsername = async (username, role) => {
    const user = await User.findOne({
        where: {
            username: username,
            role_id: role
        }
    })
    return user
}


export const getUserByEmail = async (email, role) => {
    const user = await User.findOne({
        where: {
            email: email,
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


export const changePasswordById = async (id, password) => {
    await User.update({
        password: password
    }, {
        where: {
            id: id
        }
    })
}
