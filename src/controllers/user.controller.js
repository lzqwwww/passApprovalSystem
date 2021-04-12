const request = require("request")
const WX = require("../config/wx.config")
const JWT = require("jsonwebtoken")
const JWT_config = require("../config/jwt.config")
const User = require("../models/user.model")
const secret = JWT_config.SECRET
const algorithm = JWT_config.ALGORIOTHM
let sessionKey = null
let openid = null
let user = null

exports.userAuth = (req, res) => {
  console.log(req.body)

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }
  if (req.body.code) {
    let options = {
      method: "POST",
      url: "https://api.weixin.qq.com/sns/jscode2session?",
      formData: {
        appid: WX.APPID,
        secret: WX.SECRET,
        js_code: req.body.code,
        grant_type: WX.AUTHORIZATIONCODE,
      },
    }

    request(options, (error, response, body) => {
      if (error) {
        //请求异常时，返回错误信息
        res.json({
          status: "error",
          code: "0001",
        })
        return
      } else {
        let _data = JSON.parse(body)

        let token = JWT.sign(
          {
            code: req.body.code,
            openid: _data.openid,
            sessionKey: _data.sessionKey,
            exp: Date.now() + 1000 * 60,
          }, // payload
          secret, // 签名密钥
          { algorithm } // 签名算法
        )
        if (req.body.user_type == 0) {
          user = {
            user_id: _data.openid,
            user_name: req.body.user_name,
            user_type: req.body.user_type,
            phone_no: req.body.phone_no,
            sfz_no: req.body.sfz_no,
            sfz_front: req.body.sfz_front,
            sfz_back: req.body.sfz_back,
            submit_time: new Date(),
            check_status: 0,
          }
        } else if (req.body.user_type === 1) {
          user = {
            user_id: _data.openid,
            user_name: req.body.user_name,
            user_type: req.body.user_type,
            phone_no: req.body.phone_no,
            sfz_no: req.body.sfz_no,
            sfz_front: req.body.sfz_front,
            sfz_back: req.body.sfz_back,
            company_name: req.body.company_name,
            license_no: req.body.license_no,
            license_img: req.body.license_img,
            application_img: req.body.application_img,
            submit_time: new Date(),
            check_status: 3,
          }
        }

        User.findById(_data.openid, (err, row) => {
          //数据库里没有，新增
          if (row.length == 0) {
            console.log("user1", user)

            User.create(user, (error, data) => {
              if (error) {
                res.status(500).send({
                  message:
                    error.message ||
                    "Some error occurred while creating the User.",
                })
              } else if (data) {
                res.status(200).send({
                  data: data,
                  msg: "用户添加成功",
                  token,
                })
              }
            })
          } else {
            //数据库里有，更新
            User.update(_data.openid, user, (error, data) => {
              if (error) {
                res.status(500).send({
                  message:
                    error.message ||
                    "Some error occurred while updating the User.",
                })
              } else if (data > 0) {
                res.status(200).send({
                  data: data,
                  msg: "更新用户成功",
                  token,
                })
              }
            })
          }
        })
      }
    })
  }
}
