import {
    getUserById,
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


