import {
  register,
  login,
  confirm,
  logout,
} from '../../services/auth.service.js'



const registerCtr = async (req, res) => {
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

const loginCtr = async (req, res) => {
  try {
    const msg = await login(req.body, 2)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }
}

const logoutCtr = async (req, res) => {
  try {
    const msg = await logout(req.headers.authorization)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi đăng xuất:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }
}



const confirmCtr = async (req, res) => {
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

export {
  registerCtr,
  confirmCtr,
  loginCtr,
  logoutCtr,
}