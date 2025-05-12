const bcrypt = require("bcryptjs")
const { validationResult, body } = require("express-validator")
const db = require("../database/models/index")

module.exports = {
    register: (req, res) => {
        res.render("users/register")
    },
    saveRegister: async (req, res) => {
        let errores = validationResult(req)
        console.log(req.body)
        console.log(errores)
        if(errores.isEmpty()){
            try{
                const hashedPassword = await bcrypt.hashSync(req.body.password, 8);
                console.log(hashedPassword)
                console.log(req.body.password)
                await db.Usuario.create({
                    nombre:req.body.nombre,
                    correo:req.body.correo,
                    contraseña: hashedPassword,
                    id_rol: 1
                })
                res.redirect("/users/login")
            }catch(error){
                console.log(error)
                res.render("error",{
                    error:"Problema conectando a la base de datos",
                })
            }
        }else{
            console.log("Algo esta mal")
            res.render("users/register",{
                errores:errores.mapped(),
                old:req.body
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
    registerCandidatas:(req, res) => {
        res.render("users/registerCandidatas")
    },
    loadRegisterCandidatas:async (req,res) => {
        let errores = validationResult(req)
        let saveImagen = req.file;
        /* let candidatas = await db.Candidata.findAll({
                    where:{ DNI : req.body.dni}
                })
        if(candidatas){
            console.log("Hay alguien que ya tiene ese DNI")
        }else{
            console.log("Gracias por inscribirte")  ESTO LO HARE SI NO HAY DE OTRA, SI NO LO PUEDO HACER EN EL FRONT
        } */
        console.log(req.body)
        console.log(errores)
        if(errores.isEmpty()){
            try{
                await db.Candidata.create({
                    DNI:req.body.dni,
                    nombre:req.body.nombre,
                    edad:req.body.edad,
                    correo:req.body.correo,
                    tel:req.body.tel,
                    provincia:req.body.provincia,
                    ciudad:req.body.ciudad,
                    img_candidata:
                    saveImagen != undefined ? saveImagen.filename : "default.jpg",
                    curso:req.body.curso,
                    voto:false,
                })
                res.redirect("/users/listCandidatas")
            }catch(error){
                console.log(error)
                res.render("error",{
                    error:"Problema conectando a la base de datos",
                })
            }
        }else{
            console.log("Algo esta mal")
            res.render("users/registerCandidatas",{
                errores:errores.mapped(),
                old:req.body
            })
        }
    },
    listCandidatas: async (req,res) => {
        try{
            const Candidatas = await db.Candidata.findAll()
            res.render("users/listCandidatas",{
                usuario: req.session.userLogged,
                candidatas: Candidatas
            })
        }catch(error){
            res.render("error",{error: "Problema conectando a la base de datos"})
        }
    },
    votar: async (req,res) => {
        try{
            const Candidatas = await db.Candidata.findAll()
            res.render("users/votar",{
                    usuario: req.session.userLogged,
                    candidatas: Candidatas
                })
        }catch(e){
            console.log(e)
        }
    },
    votarLoad:async (req,res) => {

    }
}