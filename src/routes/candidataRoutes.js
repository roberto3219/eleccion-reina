const express = require("express")
const router = express.Router()
const path = require("path")

const candidataController = require("../controllers/candidataControllers")

const authMiddleware = require("../middlewares/authMiddleware")
const logUserMiddleware = require("../middlewares/logUserMiddleware")

const multer = require("multer");
const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
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

router.get("/candidata/:id_candidatas",authMiddleware,candidataController.candidata);
router.post("/candidata/:id_candidatas",authMiddleware,candidataController.candidataLoad);
router.get("/registerCandidatas",authMiddleware,candidataController.registerCandidatas);
router.post("/registerCandidatas",fileUpload.single("imagenCandidata"),logUserMiddleware,candidataController.loadRegisterCandidatas);
router.get("/listCandidatas",candidataController.listCandidatas);
router.get("/votar",authMiddleware,candidataController.votar);
router.post("/votar",authMiddleware,candidataController.votarLoad);
router.get("/resultados",authMiddleware,candidataController.resultado)
router.get("/resultadoTotal",authMiddleware,candidataController.resultadosTotales)
router.get("/descargar-pdf",authMiddleware,candidataController.descargar_pdf_total)

module.exports = router