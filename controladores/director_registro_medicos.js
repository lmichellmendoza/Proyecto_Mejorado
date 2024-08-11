const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// La ruta de la página de donde se obtiene la info
router.get("/registro_medico", async function(req, res) {
    try {
        const [rows] = await conexion.query('SELECT * FROM vista_registro_medico'); //Llamando a la vista
        res.json(rows); // Envía los datos como JSON
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

module.exports = router;
