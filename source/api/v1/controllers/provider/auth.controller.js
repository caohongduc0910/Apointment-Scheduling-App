import {
  register,
  confirm,
} from '../../services/auth.service.js'


export const registerAct = async (req, res) => {
  try {
    const msg = await register(req.body, 2)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi đăng kí:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }
}

export const confirmAct = async (req, res) => {
  try {
    const msg = await confirm(req.query, 2)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi xác thực tài khoản:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }
}