const db = require("../database/models/index.js");
const controller = {
    index: async(req,res) => {
        try{
            res.render("index",{
                usuario: req.session.userLogged,
            })
        }catch(e){
            res.render("error",{error: "Problema conectando a la base de datos"})
        }
    }
}
module.exports = controller