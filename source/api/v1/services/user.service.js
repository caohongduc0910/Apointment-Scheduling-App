import {
    getUserByID, getUserByUUID, updateUserByID, updateUserByUUID
} from "../repositories/user.repo.js"


export const detail = async (req) => {

    const user = req.params.id ? await getUserByID(req.params.id) : await getUserByUUID(req.params.uuid)

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
        const user = await getUserByUUID(req.params.uuid)
        if (req.params.uuid != user.id) {
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



