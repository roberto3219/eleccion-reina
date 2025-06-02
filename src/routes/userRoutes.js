const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

const registerValidator = require("../middlewares/registerValidator")

router.get("/register",userController.register)
router.post("/register",registerValidator,userController.saveRegister)
router.get("/login",userController.login)
router.post("/login",userController.loadLogin)


module.exports = router