const JWT = require("jsonwebtoken")
const JWT_config = require("../config/jwt.config")
const secret = JWT_config.SECRET
const algorithm = JWT_config.ALGORIOTHM

function JWT_auth(req, res, next) {
  let Authorization = req.headers["authorization"]
  console.log("Authorization:", Authorization)
  if (Authorization)
    try {
      let token = Authorization
      JWT.verify(token, secret, { algorithm: "HS256" }, (err, decoded) => {
        // 用户认证
        if (err) {
          next(err)
        } else {
          req.tokenContent = decoded // 在 req 上添加 username,以便于传到下一个中间件取出 username 来查询数据库
          next()
        }
      })
    } catch (err) {
      res.status(401).send("未授权")
    }
  else res.status(401).send("未授权")
}
module.exports = JWT_auth
