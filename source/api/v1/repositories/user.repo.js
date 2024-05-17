import User from '../models/mysql/users.js'
import Role from '../models/mysql/roles.js'

export const getUserById = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        },
        attributes: { exclude: ['id', 'password', 'uuid', 'verified_at', 'deleted_at'] },
        include: {
            model: Role,
            as: 'role'
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


export const getUserDetailById = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        },
    })
    return user
}


export const getAllUserByRole = async (role) => {
    const users = await User.findAll({
        where: {
            role_id: role
        },
        attributes: { exclude: ['id', 'password', 'uuid'] }
    })
    return users
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


export const updateUserById = async (id, user) => {
    await User.update(user, {
        where: {
            id: id
        }
    })
}


export const deleteUserById = async (id) => {
    await User.destroy({
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
