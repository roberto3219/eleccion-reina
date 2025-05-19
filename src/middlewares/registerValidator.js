// Middleware de validacion del registro
let path = require("path");
const { body } = require("express-validator");
const { Usuario } = require("../database/models");

const registerValidator = [

body("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .custom(async (value, { req }) => {
        const existingUser = await Usuario.findOne({ where: { dni: value } });
        if (existingUser) {
        throw new Error("El DNI ya está registrado.");
      }
      return true;
    }),
body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),
body("correo")
    .notEmpty()
    .withMessage("El correo es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un formato de e-mail válido.")
    .custom(async (value, { req }) => {
        const existingUser = await Usuario.findOne({ where: { correo: value } });
        if (existingUser) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  /* body("repass").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
  }), */
];

module.exports = registerValidator;