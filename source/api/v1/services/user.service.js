import {
    getUserByID,
    getUserByUUID,
    updateUserByID,
    updateUserByUUID,
    deleteUserByID,
    getAllUserByRole
} from "../repositories/user.repo.js"


export const detail = async (req) => {

    let user
    if (req.params.id) {
        user = await getUserByID(req.params.id)
    }
    else {
        const existUser = await getUserByUUID(req.params.uuid)
        if (existUser.id != req.user.id) {
            const answer = {
                status: 401,
                info: {
                    msg: "Không có quyền",
                }
            }
            return answer
        }
        else {
            user = existUser
        }
    }

    if (user) {
        const answer = {
            status: 200,
            info: {
                msg: "Lấy thành công chi tiết User",
                user: user
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

    const user = req.file ? {
        email: req.body.email || null,
        fullname: req.body.fullname || null,
        image: `http://localhost:3000/images/${req.file.filename}`,
        address: req.body.address || null,
        phone: req.body.phone || null
    } : {
        email: req.body.email || null,
        fullname: req.body.fullname || null,
        address: req.body.address || null,
        phone: req.body.phone || null
    }

    if (req.params.id) {
        await updateUserByID(req.params.id, user)
    }
    else {
        const existUser = await getUserByUUID(req.params.uuid)
        if (req.user.id != existUser.id) {
            const answer = {
                status: 401,
                info: {
                    msg: "Không có quyền",
                }
            }
            return answer
        }
        await updateUserByUUID(req.params.uuid, user)
    }

    const answer = {
        status: 200,
        info: {
            msg: "Cập nhật thành công",
            user: user
        }
    }
    return answer
}


export const deleteAcc = async (req) => {

    const uuid = req.params.uuid
    const existUser = await getUserByUUID(uuid)

    if (existUser.id != req.user.id) {
        const answer = {
            status: 401,
            info: {
                msg: "Không có quyền",
            }
        }
        return answer
    }

    await deleteUserByID(existUser.id)
    await deleteTokenByUserId(existUser.id)
    const answer = {
        status: 200,
        info: {
            msg: "Xóa thành công",
        }
    }
    return answer
}


export const getListUser = async (req) => {
    const arr = await getAllUserByRole(req.query.user_role)
    if (arr.length == 0) {
        const answer = {
            status: 200,
            info: {
                msg: "Danh sách trống",
            }
        }
        return answer
    }
    const answer = {
        status: 200,
        info: {
            msg: "Lấy danh sách thành công",
            users: arr
        }
    }
    return answer
}