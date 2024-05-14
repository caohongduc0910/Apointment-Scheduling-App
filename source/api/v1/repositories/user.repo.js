import User from '../models/mysql/users.js'

const getUserById = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        },
        attributes: { exclude: ['id', 'password', 'uuid'] }
    })
    return user
}

const getUserByUsername = async (username, role) => {
    const user = await User.findOne({
        where: {
            username: username,
            role_id: role
        }
    })
    return user
}

const getUserByEmail = async (email, role) => {
    const user = await User.findOne({
        where: {
            email: email,
            role_id: role
        }
    })
    return user
}

const createUser = async (newUser) => {
    await User.create(newUser)
    return newUser
}

const updateUserStatus = async (id) => {
    await User.update({
        status: 1
    }, {
        where: {
            id: id
        }
    })
}

const updateUserById = async (id, user) => {
    await User.update(user, {
        where: {
            id: id
        }
    })
}

const changePasswordById = async (id, password) => {
    await User.update({
        password: password
    }, {
        where: {
            id: id
        }
    })
}

export {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updateUserStatus,
    updateUserById,
    changePasswordById,
}