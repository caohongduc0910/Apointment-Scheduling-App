import {
  login,
  logout,
  changePassword
} from '../../services/auth.service.js'


export const loginAct = async (req, res) => {
  try {
    const msg = await login(req.body, 1)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }
}


export const logoutAct = async (req, res) => {
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


export const changePasswordAct = async (req, res) => {
  try {
      const msg = await changePassword(req)
      res.status(msg.status).json(msg.info)
  }
  catch (error) {
      res.status(500).json({
          msg: "Lỗi đổi mật khẩu"
      })
  }
}
