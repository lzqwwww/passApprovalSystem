var express = require("express")
var router = express.Router()
const user = require("../controllers/user.controller")

router.post("/userauth", user.userAuth)

module.exports = router
