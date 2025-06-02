const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const db = require("../database/models/index")

module.exports = {
    
    register: (req, res) => {
        res.render("users/register",{ error:null,})
    },
    saveRegister: async (req, res) => {
        try{
                let errores = validationResult(req)
                console.log(req.body)
                console.log(errores)
                const correoVerificar = await db.Usuario.findOne({
                    where: {
                        correo: req.body.correo
                    }
                })
                const dniVerificar = await db.Usuario.findOne({
                    where:{
                        DNI:req.body.dni
                    }
                })
/*                 console.log("sdadad" + correoVerificar + "dasdasdasdsad")
 */             if(errores.isEmpty() && correoVerificar == null && dniVerificar == null){                
                const hashedPassword = await bcrypt.hashSync(req.body.password, 8);
                console.log(hashedPassword)
                console.log(req.body.password)
                await db.Usuario.create({
                    nombre:req.body.nombre,
                    correo:req.body.correo,
                    contraseña: hashedPassword,
                    id_rol: 1,
                    DNI:req.body.dni
                })
                res.redirect("/users/login")
                }else{
                    console.log("Algo esta mal")
                    res.render("users/register",{
                        errores:errores.mapped(),
                        old:req.body
                    })
                }
        }catch(error){
            console.log(error)
            res.render("error",{
                error:"Problema conectando a la base de datos",
            })
        }
    },
    login:(req, res) => {
        res.render("users/login", { error: null })
    },
    loadLogin:async function(req,res){
        try{
            const usuario = await db.Usuario.findOne({
                where:{ correo: req.body.correo}
            })
            console.log(req.body + "Del formulario")
            console.log(usuario + "De la base de datos")
            if(usuario){
                const validarPass = await bcrypt.compare(
                    req.body.password,
                    usuario.contraseña
                )
                if(validarPass){
                    let loginData = {
                        id_usuario:usuario.id,
                        nombre:usuario.nombre,
                        correo:usuario.correo,
                        id_rol:usuario.id_rol,
                        num_jurado:usuario.num_jurado,
                    }
                    req.session.userLogged = loginData
                    res.redirect("/");
                }else{
                    res.render("users/login",{
                        old:req.body,
                        error: "Contraseña incorrecta"
                    })
                }
            }else{
                res.render("users/login",{
                        old:req.body,
                        error: "No existe un usuario con este correo"
                    })
            }
        }catch(error){
            console.log(error)
            res.render("error", {error: "Problema conecando a la base de daos"})
        }
    },
    
}