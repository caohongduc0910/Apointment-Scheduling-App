import User from '../models/mysql/users.js'

const getUserByUsername = async (username, role) => {
    const user = await User.findOne({
        where: {
            username: username,
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


export {
    getUserByUsername,
    createUser,
    updateUserStatus,
}