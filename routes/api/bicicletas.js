// Edwin Fandiño Salazar
// 20221978016

const express = require('express');
const router = express.Router();
const bicicletaController = require('../../controller/api/bicicleta.controller.api');

router.get('/', bicicletaController.bicicleta_list);
router.post('/crearBicicleta', bicicletaController.bicicleta_create);
router.delete('/eliminarBicicleta', bicicletaController.bicicleta_delete);

module.exports = router;