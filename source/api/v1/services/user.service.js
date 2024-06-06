import {
    getUserByID, getUserByUUID
} from "../repositories/user.repo.js"


export const detail = async (req) => {

    let user
    if(req.params.id) {
        user = await getUserByID(req.params.id) 
    }
    else{
        const existUser = await getUserByUUID(req.params.uuid)
        if(existUser.id != req.user.id) {
            const answer = {
                status: 401,
                info: {
                    msg: "Không có quyền",
                }
            }
            return answer
        }
        else{
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


