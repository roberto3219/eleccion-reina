const db = require("../database/models/index.js");
const controller = {
    index: async(req,res) => {
        try{
            const candidatas = await db.Candidata.findAll({ limit: 6 })
            res.render("index",{
                candidatas:candidatas,
                usuario: req.session.userLogged,
            })
        }catch(e){
            res.render("error",{error: "Problema conectando a la base de datos"})
        }
    }
}
module.exports = controller