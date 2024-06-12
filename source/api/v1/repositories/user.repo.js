import User from '../models/mysql/users.js'
import Role from '../models/mysql/roles.js'
import Service from '../models/mysql/services.js'

export const getUserByID = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Role,
                as: 'role'
            }, {
                model: Service,
                as: 'services',
                attributes: { exclude: ['provider_id', 'created_at', 'updated_at', 'deleted_at'] }
            }
        ]
    })
    return user
}


export const getUserByUUID = async (uuid) => {
    const user = await User.findOne({
        where: {
            uuid: uuid,
        },
        include: [
            {
                model: Role,
                as: 'role'
            }, {
                model: Service,
                as: 'services',
                attributes: { exclude: ['provider_id', 'created_at', 'updated_at', 'deleted_at'] }
            }
        ]
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


export const getAllUserByRole = async (role) => {
    const users = await User.findAll({
        where: {
            role_id: role
        },
        attributes: { exclude: ['password', 'uuid'] }
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


export const updateUserByID = async (id, user) => {
    await User.update(user, {
        where: {
            id: id
        }
    })
}


export const updateUserByUUID = async (uuid, user) => {
    await User.update(user, {
        where: {
            uuid: uuid
        }
    })
}


export const deleteUserByID = async (id) => {
    await User.destroy({
        where: {
            id: id
        }
    })
}


export const changePasswordByID = async (id, password) => {
    await User.update({
        password: password
    }, {
        where: {
            id: id
        }
    })
}
