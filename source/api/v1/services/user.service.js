import {
    getUserByID, getUserByUUID
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


