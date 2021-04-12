var express = require("express")
var router = express.Router()
const admin = require("../controllers/admin.controller")
const JWT_auth = require("../middlewares/jwt")

router.post("/register", admin.create)

router.post("/login", admin.login)

router.get("/getLoginInfo", JWT_auth, admin.getLoginInfo)

router.get("/users", JWT_auth, admin.getUserApply)

router.get("/users/unprocess", JWT_auth, admin.getUnprocessUser)

router.post("/users/search", JWT_auth, admin.findByName)

router.get("/users/:id", JWT_auth, admin.getUserInfo)

router.post("/users/check", JWT_auth, admin.checkUser)

router.get("/users/unprocess/next/:id", JWT_auth, admin.nextUnprocessedUser)

router.get("/users/unprocess/pre/:id", JWT_auth, admin.preUnprocessedUser)

router.get("/users/next/:id", JWT_auth, admin.nextUser)

router.get("/users/pre/:id", JWT_auth, admin.preUser)

module.exports = router
