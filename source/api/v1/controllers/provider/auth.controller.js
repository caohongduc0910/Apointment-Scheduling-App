import {
  register,
  login,
  confirm,
  logout,
  forgetPassword,
  resetPassword,
  changePassword
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


export const loginAct = async (req, res) => {
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


export const forgetPasswordAct = async (req, res) => {
  try {
    const msg = await forgetPassword(req.body, 2)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi quên mật khẩu:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" })
    return
  }

}


export const resetPasswordAct = async (req, res) => {
  try {
    const msg = await resetPassword(req)
    res.status(msg.status).json(msg.info)
  }
  catch (error) {
    console.error("Lỗi quên đặt lại mật khẩu:", error);
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

