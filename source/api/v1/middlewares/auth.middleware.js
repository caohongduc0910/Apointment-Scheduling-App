import jwt from 'jsonwebtoken'
import { getTokenByToken } from '../repositories/token.repo.js'

const authToken = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, async (err, user) => {
            if (err) {
                return res.status(400).json({
                    msg: "Token không chính xác!"
                })
            }
            const existToken = await getTokenByToken(accessToken)

            if (existToken) {
                req.user = user
                next()
            }
            else {
                return res.status(400).json({
                    msg: "Không có quyền thực hiện do token đã bị xóa!"
                })
            }
        })
    }
    else {
        return res.status(400).json({
            msg: "Vui lòng gửi kèm token!"
        })
    }
}

export default authToken