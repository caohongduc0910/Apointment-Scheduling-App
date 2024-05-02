import User from '../../models/mysql/user.js'
import pkg from 'md5';
const { md5 } = pkg;


// const register = async (req, res) => {

//   const existUsername = await db.User.findOne({
//     username: req.body.username,
//     status: "active"
//   })

//   if (existEmail) {
//     res.status(400).json({
//       msg: "Tên đăng nhập đã tồn tại",
//     })
//   }
//   else {
//     req.body.password = md5(req.body.password)
//     const newUser = new User(req.body)
//     await newUser.save()
//     res.status(200).json({
//       msg: "Đăng kí thành công",
//       User: newUser
//     })
//   }
// }

const login = async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log(username, password)
  const test = await User.findAll({
    attributes: ['id', 'username', 'email']
  })
  console.log(test)
  try {
    const user = await User.findOne({
      where: {
        status: "active",
        username: username
      }
    })

    if (!user) {
      res.status(400).json({
        msg: "Không tồn tại người dùng"
      })
      return
    }

    if (password != user.password) {
      res.status(400).json({
        msg: "Sai mật khẩu"
      })
      return
    }

    // res.cookie("tokenUser", user.tokenUser)
    res.status(200).json({
      msg: "Đăng nhập thành công",
      User: user
    })
  }
  catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ msg: "Lỗi kết nối đến cơ sở dữ liệu" });
  }
}

export {
  login
}