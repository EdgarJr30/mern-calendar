/*
Rutas de usuarios / Auth
hostname + /api/auth

*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es oblgatorio").not().isEmpty(),
    check("email", "El email es oblgatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    //middlewares
    check("email", "El email es oblgatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
