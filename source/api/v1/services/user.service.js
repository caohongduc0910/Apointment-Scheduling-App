import {
    getUserById,
    updateUserById,
} from "../repositories/user.repo.js"


export const detail = async (data) => {

    const id = data.id
    const user = await getUserById(id)
    const detailUser =  {
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



