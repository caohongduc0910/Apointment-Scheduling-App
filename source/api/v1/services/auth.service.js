import {
  getUserByUsername,
  createUser,
  updateUserStatus,
} from '../repositories/user.repo.js'

import { createAccessToken, decodeAccessToken } from '../../../helper/JWTtoken.js'
import bcrypt from 'bcrypt'
import confirmEmail from '../../../helper/sendMail.js'

const register = async (data, role) => {

  const existUser = await getUserByUsername(data.username, role)

  if (existUser) {
    const answer = {
      status: 400,
      info: {
        msg: "Tên đăng nhập đã tồn tại"
      }
    }
    return answer
  }

  if (data.password != data.cfpassword) {
    const answer = {
      status: 400,
      info: {
        msg: "Mật khẩu xác nhận không khớp"
      }
    }
    return answer
  }

  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(data.password, salt)

  const newUser = {
    username: data.username,
    email: data.email,
    password: hashed,
    role_id: role
  }

  await createUser(newUser)

  const user = await getUserByUsername(newUser.username, role)
  const token = createAccessToken(user.id)

  const subject = "Email xác nhận kích hoạt tài khoản"

  let link = role == 3 ? `http://localhost:3000/api/v1/auth/confirm?token=${token}`
  : `http://localhost:3000/api/v1/provider/auth/confirm?token=${token}`

  const html = `
    <h3> Xin chào bạn ${newUser.username}, vui lòng nhấn vào nút bên dưới để kích hoạt tài khoản </h3>
    <a href=${link}>Xác nhận tài khoản!</a>
    `
  confirmEmail(newUser.email, subject, html)

  const answer = {
    status: 200,
    info: {
      msg: 'Đăng kí thành công, vui lòng kiểm tra email để kích hoạt tài khoản',
      user: newUser,
      link: link
    }
  }
  return answer
}

const confirm = async (data, role) => {
  const token = data.token
  let answer = null

  try {
    const decoded = decodeAccessToken(token)
    if (role == 3) {
      await updateUserStatus(decoded.id)
      answer = {
        status: 200,
        info: {
          msg: "Kích hoạt tài khoản thành công"
        }
      }
      return answer
    }
    else {
      answer = {
        status: 200,
        info: {
          msg: "Kích hoạt tài khoản thành công, chờ admin phê duyệt"
        }
      }
      return answer
    }
  }
  catch (error) {
    answer = {
      status: 400,
      info: {
        msg: "Token không chính xác!"
      }
    }
    return answer
  }
}

export {
  register,
  confirm,
}