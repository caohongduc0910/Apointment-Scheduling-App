import { deleteTokenByUserId } from "../repositories/token.repo.js"
import {
    getUserById,
    updateUserById,
    deleteUserById,
    getUserDetailById,
    changePasswordById,
} from "../repositories/user.repo.js"

import bcrypt from 'bcrypt'


export const detail = async (data) => {

    const id = data.id
    const user = await getUserById(id)
    const detailUser = {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        image: user.image,
        address: user.address,
        phone: user.phone,
        role: user.role.role_name
    }

    if (detailUser) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy thành công chi tiết User",
                user: detailUser
            }
        }
        return answer
    }
    else {
        const answer = {
            status: 400,
            info: {
                msg: "Lấy thất bại chi tiết User"
            }
        }
        return answer
    }
}


export const update = async (req) => {
    const id = req.user.id

    const user = {
        email: req.body.email,
        fullname: req.body.fullname,
        image: `http://localhost:3000/images/${req.file.filename}`,
        address: req.body.address,
        phone: req.body.phone
    }

    await updateUserById(id, user)

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật thành công",
            user: user
        }
    }
    return answer
}


export const changePassword = async (req) => {
    const id = req.user.id
    const password = req.body.password
    const newPassword = req.body.newpassword
    const cfPassword = req.body.cfpassword

    const user = await getUserDetailById(id)

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        const answer = {
            status: 400,
            info: {
                msg: "Mật khẩu không chính xác",
            }
        }
        return answer
    }

    if (newPassword != cfPassword) {
        const answer = {
            status: 400,
            info: {
                msg: "Mật khẩu xác nhận không khớp",
            }
        }
        return answer
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(newPassword, salt)
    await changePasswordById(id, hashed)
    await deleteTokenByUserId(id)
    const answer = {
        status: 200,
        info: {
            msg: "Đổi mật khẩu thành công",
        }
    }
    return answer
}


export const deleteAcc = async (data) => {
    const id = data.id
    await deleteUserById(id)
    await deleteTokenByUserId(id)
    const answer = {
        status: 200,
        info: {
            msg: "Xóa thành công",
        }
    }
    return answer
}









