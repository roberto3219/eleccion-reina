let path = require("path");
const { body } = require("express-validator");
const { Candidata } = require("../database/models");

const registerValidator = [
    body("nombre")
        .notEmpty()
        .withMessage("Nombre es obligatorio")
        .isLength({min: 4})
        .withMessage("El nombre debe tener al menos 4 caracteres")
]

module.exports = registerValidator