const Admin = require("../models/admin.model")
const User = require("../models/user.model")
const JWT = require("jsonwebtoken")
const JWT_config = require("../config/jwt.config")
const secret = JWT_config.SECRET
const algorithm = JWT_config.ALGORIOTHM

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
  }

  const admin = new Admin({
    admin_name: req.body.admin_name,
    password: req.body.password,
    phone_no: req.body.phone_no,
    avatar_img: req.body.avatar_img,
  })
  admin.create_time = new Date()
  admin.login_time = null

  Admin.create(admin, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Customer.",
      })
      return
    }
    res.status(200).send(data)
  })
}

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
  }
  let { admin_name, password } = req.body
  Admin.findByName(admin_name, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while query the admin.",
      })
    }
    if (!data) {
      res.status(200).send({ code: 1, message: "没有该用户", data: {} }) //code 1:没有该用户
    } else if (data.password !== password) {
      res.status(200).send({ code: 2, message: "密码错误", data: {} })
    } else {
      let token = JWT.sign(
        { admin_name: data.admin_name, exp: Date.now() + 1000 * 60 }, // payload
        secret, // 签名密钥
        { algorithm } // 签名算法
      )
      res.status(200).send({
        code: 0,
        message: "登录成功",
        data: { token },
      })
    }
  })
}

exports.getLoginInfo = (req, res) => {
  res.status(200).send({
    data: req.tokenContent,
  })
}

exports.getUserApply = (req, res) => {
  let { currentPage, pageSize } = req.query
  if (currentPage && pageSize) {
    User.userPagination(currentPage, pageSize, (error, data) => {
      if (error) {
        res.status(500).send({
          message: "用户分页查询失败",
        })
      } else {
        res.status(200).send({
          data,
        })
      }
    })
  } else {
    User.getAllUser((error, data) => {
      if (error) {
        res.status(500).send({
          message: "查询所有用户申请失败",
        })
      }
      res.status(200).send({
        data,
        total: data.length,
      })
    })
  }
}

exports.getUnprocessUser = (req, res) => {
  let { currentPage, pageSize } = req.query
  if (currentPage && pageSize) {
    User.unprocessUserPagination(currentPage, pageSize, (error, data) => {
      if (error) {
        res.status(500).send({
          message: "未处理用户分页查询失败",
        })
      } else {
        res.status(200).send({
          data,
        })
      }
    })
  } else {
    User.getUnprocessUser((error, data) => {
      if (error) {
        res.status(500).send({
          message: "查询所有未处理用户申请失败",
        })
      }
      res.status(200).send({
        data,
        total: data.length,
      })
    })
  }
}

exports.findByName = (req, res) => {
  let { currentPage, pageSize, user_name } = req.body
  User.findByName(currentPage, pageSize, user_name, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "用户查询失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}

exports.getUserInfo = (req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "获取用户信息失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}

exports.checkUser = (req, res) => {
  let newUser = req.body
  console.log(newUser)

  User.update(newUser, (error, data) => {
    if (error) {
      console.log(error)

      res.status(500).send({
        message: "获取用户信息失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}

exports.nextUnprocessedUser = (req, res) => {
  User.nextUnprocessedUser(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "获取下一个未处理用户失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}

exports.preUnprocessedUser = (req, res) => {
  User.preUnprocessedUser(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "获取上一个未处理用户失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}

exports.nextUser = (req, res) => {
  User.nextUser(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "获取下一个用户失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}
exports.preUser = (req, res) => {
  User.preUser(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: "获取上一个用户失败",
      })
    } else {
      res.status(200).send({
        data,
      })
    }
  })
}
