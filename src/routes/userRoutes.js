const express = require("express")
const router = express.Router()
const path = require("path")

const userController = require("../controllers/userController")

const authMiddleware = require("../middlewares/authMiddleware")

const multer = require("multer");
const multerDiskStorage = multer.diskStorage({
    destination: (req,feil,callback) => {
        let folder = path.join(__dirname,"../../public/images/candidatas/");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        console.log(file)
        let imageName = "candidata-" + Date.now() + path.extname(file.originalname);
        callback(null,imageName)
    }
})

let fileUpload = multer({ storage: multerDiskStorage})

router.get("/register",userController.register)
router.post("/register",userController.saveRegister)
router.get("/login",userController.login)
router.post("/login",userController.loadLogin)
router.get("/registerCandidatas",authMiddleware,userController.registerCandidatas)
router.post("/registerCandidatas",fileUpload.single("imagenCandidata"),authMiddleware,userController.loadRegisterCandidatas)
router.get("/listCandidatas",userController.listCandidatas)
router.get("/Candidata/:id",userController.candidata)
router.get("/votar",authMiddleware,userController.votar)
router.post("/votar",authMiddleware,userController.votarLoad)

module.exports = router