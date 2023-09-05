/*
Rutas de usuarios / Events
hostname + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

//Todas tienen que pasar los la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get("/", getEvents);

//Crear nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalizacion es obligatorio").custom(isDate),

    validarCampos,
  ],
  createEvent
);

//Actualizar evento
router.put("/:id", updateEvent);

//Actualizar evento
router.delete("/:id", deleteEvent);

module.exports = router;
