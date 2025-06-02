const PDFDocument = require('pdfkit');
const {Table} = require('pdfkit-table')
const { addTable} = require('pdfkit-table')
const fs = require("fs");
const path = require("path")
const db = require("../database/models/index.js");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { validationResult } = require("express-validator");
const { error, group } = require("console");

module.exports = {
    candidata:async (req, res) => {
        try{
            /* console.log(req.params) */
            const candidata = await db.Candidata.findOne({
                where:{
                    num_candidata : req.params.id_candidatas,
                },
                include:[
            { model: db.Rol, as: "rol" },
                ],
            });
            /* console.log(candidata.num_candidata) */
            /*  const existe_voto = await db.CalificacionCandidata.findOne({
                where:{
                    id_candidata:candidata.num_candidata
                }
            }) */
            /* console.log(candidata + "hosdalods") */
            res.render("users/candidata",{
                candidata:candidata,
                usuario:req.session.userLogged,
                /* old:existe_voto, */
            })
        }catch(error){
            console.log(error)
            res.render("error",{ error: "Problema conectando a la base de datos"})
        }
    },
    candidataLoad:async (req, res) => {
        try{
            console.log(req.body.candidataNumero + "sdahjd jsahd jksahdj hasd")
            usuario =  req.session.userLogged
            
        /*          Tira error, osea no consulta con la tabla conrespondiente asi que usare otro metodo
           const votoExistente = await db.CalificacionCandidata.findOne({
                where:{
                    jurado_N: usuario.num_jurado,
                    id_candidata: req.body.candidataNumero,
                }
            });
            console.log(votoExistente + 'fgddgrddgdyfgtfytfi') */
           /*  if(!votoExistente) { */
                    await db.CalificacionCandidata.destroy({
                        where:{
                            id_candidata:req.body.candidataNumero,
                            jurado_N:usuario.num_jurado,
                        }
                    })
                    await db.CalificacionCandidata.create({
                        jurado_N:usuario.num_jurado,
                        Apellido_Nombre:req.body.candidataNombre,
                        Curso:req.body.curso,
                        id_candidata:req.body.candidataNumero,
                        belleza:req.body.belleza,
                        Elegancia:req.body.elegancia,
                        Simpatia:req.body.simpatia,
                        fotografia:req.body.fotografia,
                    })
                    const siguiente = await db.Candidata.findOne({
                        where:{
                            num_candidata:{
                            [Op.gt]: req.body.candidataNumero
                            }
                        },
                        order: [['num_candidata','ASC']]
                    })
                    /* console.log(siguiente.num_candidata + "sdjasdsada")
 */     
                    if(siguiente){
                        res.redirect(`/candidatas/candidata/${siguiente.num_candidata}?candidata=siguiente&old=req.body`)
                    }else{
                        res.redirect('/candidatas/listcandidatas')
                    }
           /*  }else{
                await db.CalificacionCandidata.update({
                    belleza:req.body.belleza,
                    Elegancia:req.body.elegancia,
                    Simpatia:req.body.simpatia
                },
            {
                where:{
                    jurado_N: usuario.num_jurado,
                    id_candidata: req.body.candidataNumero
                }
            })
                const Candidatas = await db.Candidata.findAll()
                console.log("Se actualizo con exito!!")
                res.render('/candidatas/listcandidatas',{
                    candidata:Candidatas,
                    usuario:req.session.userLogged,
                })
            } */
        }catch(e){
            console.log(e)
        }
    },
    registerCandidatas:(req, res) => {
        res.render("users/registerCandidatas",{
                    usuario: req.session.userLogged,
                })
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
            /* console.log(req) */
            /* console.log(req.body + " i don't got it") */
            res.render("users/votar",{
                    usuario: req.session.userLogged,
                    candidatas: Candidatas
                })
        }catch(e){
            console.log(e)
        }
    },
    votarLoad:async (req,res) => {
        try{
            const usuario = req.session.userLogged
            console.log(usuario)
            
        }catch(error){
            console.log(e)
        }
    },
    resultado:async (req,res) => {
        try{
            const Candidatas = await db.Candidata.findAll()
            const votos_jurado = await db.CalificacionCandidata.findAll()
            res.render("users/resultadosCandidatas",{
                usuario:req.session.userLogged,
                candidatas: Candidatas,
                votos: votos_jurado,
                totalGeneral: 0
            })
        }catch(e){
            console.log(e + " ERROR 404 GRAvE")
        }
    },
    resultadosTotales: async (req,res) => {
        try{
            const totalesPorJurado = await db.CalificacionCandidata.findAll({
                attributes:[
                    'id_candidata',
                    'jurado_N',
                    [Sequelize.literal('SUM(belleza + Elegancia + Simpatia)'), 'total_jurado']
                ],
                group:['id_candidata','jurado_N'],
                raw:true
            })
            console.log(totalesPorJurado.total_jurado + " Hola estoy verificando")

            const candidatas = {};

            totalesPorJurado.forEach(voto => {
                const id = voto.id_candidata;
                const jurado = voto.jurado_N;
                const total = voto.total_jurado;
                
                console.log(id + "jshdajkdjksadkj")
                console.log(jurado + "jshdajkdjksadkj")
                console.log(total + "jshdajkdjksadkj")
                
                if(!candidatas[id]){
                    candidatas[id] = {
                        id_candidata:id,
                        total_J1: 0,
                        total_J2: 0,
                        total_J3: 0,
                        total_J4: 0,
                        total_gral: 0,
                    }
                }
                candidatas[id][`total_J${jurado}`] = total;
                candidatas[id].total_gral += parseInt(total);

            });

            for(const id in candidatas){
                const datos = candidatas[id];
                const info = await db.Candidata.findByPk(id);

                /* await db.CalificacionTotal.destroy({
                    where:{
                        id_candidata: datos.id_candidata
                    }
                }) */
                const existente = await db.CalificacionTotal.findOne({
                  where: { id_candidata: datos.id_candidata }
                });

                if (existente) {
                  await db.CalificacionTotal.update({
                    Curso: info.curso,
                    Apellido_nombre: info.nombre,
                    total_J1: datos.total_J1,
                    total_J2: datos.total_J2,
                    total_J3: datos.total_J3,
                    total_J4: datos.total_J4,
                    total_gral: datos.total_gral,
                  }, {
                    where: { id_candidata: datos.id_candidata }
                  });
                } else {
                  await db.CalificacionTotal.create({
                    id_candidata: datos.id_candidata,
                    Curso: info.curso,
                    Apellido_nombre: info.nombre,
                    total_J1: datos.total_J1,
                    total_J2: datos.total_J2,
                    total_J3: datos.total_J3,
                    total_J4: datos.total_J4,
                    total_gral: datos.total_gral,
                  });
                }
                /* await db.CalificacionTotal.upsert({
                    id_candidata : datos.id_candidata,
                    Curso: info.curso,
                    Apellido_nombre: info.nombre,
                    total_J1: datos.total_J1,
                    total_J2: datos.total_J2,
                    total_J3: datos.total_J3,
                    total_J4: datos.total_J4,
                    total_gral: datos.total_gral,
                }) */
            }

            const resultados = await db.CalificacionTotal.findAll({
                order: [['total_gral','DESC']]
            });
            res.render("users/resultadoTotal",{
                usuario:req.session.userLogged,
                resultados: resultados,
            })
        }catch(e){
            console.log(e + "  Que paso ACA")
            res.render("error")
        }
    },
    descargar_pdf_total:async (req,res) => {
        try{
        const resultados = await db.CalificacionTotal.findAll({
        order: [['total_gral', 'DESC']]
        });

        const pdfFolder = path.join(__dirname, '../../public/pdf');
        if (!fs.existsSync(pdfFolder)) {
        fs.mkdirSync(pdfFolder, { recursive: true });
        }
  
        const filePath = path.join(pdfFolder, 'resultado_total.pdf');
        const doc = new PDFDocument({ margin: 40, size: 'A4' });
  
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        var y = 150

      // Títulos centrados
        doc
        .fontSize(16)
        .text("Elección Reina", { align: 'center' })
        .text("Esc de Ed. Técnica N° 1 de Palpalá", { align: 'center' })
        .moveDown(1);

        doc
        .fontSize(14)
        .text("Total de Puntajes Gral. de las Candidatas", { align: 'center' })
        doc.moveTo(40, y + 15).lineTo(570, y + 15).lineWidth(0.3).strokeColor("#aaa").stroke()
        .moveDown(1);

      // Encabezados de la tabla
        doc.fontSize(10).font("Helvetica-Bold");
        doc.text("N°", 40,y);
        doc.text("Apellido_Nombre", 110,y);
        doc.text("Curso", 220, y);
        doc.text("Total J1", 270,y);
        doc.text("Total J2", 330,y);
        doc.text("Total J3", 390,y);
        doc.text("Total J4", 450,y);
        doc.text("Total gral", 510,y);
        /* doc.moveDown(0.5); */
        doc.font("Helvetica");
        doc.moveTo(40, y + 15).lineTo(570, y + 15).lineWidth(0.3).strokeColor("#aaa").stroke();
        y = 170

        resultados.forEach((candidata) => {
            
        doc.text(candidata.id_candidata.toString(), 40,y);
        doc.text(candidata.Apellido_nombre, 110,y, { width: 140 });
        doc.text(candidata.Curso, 220, y);
        doc.text(candidata.total_J1.toString(), 270,y);
        doc.text(candidata.total_J2.toString(), 330,y);
        doc.text(candidata.total_J3.toString(), 390,y);
        doc.text(candidata.total_J4.toString(), 450,y);
        doc.text(candidata.total_gral.toString(), 510,y);
        doc.moveDown(0.5);
        doc.moveTo(40, y + 15).lineTo(570, y + 15).lineWidth(0.3).strokeColor("#aaa").stroke();

        y += 30
        });

        doc.end();

        stream.on('finish', () => {
        res.download(filePath, 'resultado_total.pdf');
        });
        
        }catch(e){
            console.log(e)
        }
    }
}