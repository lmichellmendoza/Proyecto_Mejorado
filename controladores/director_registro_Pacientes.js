const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// La ruta de la página de donde se obtiene la info
router.get("/registro_pacientes_director", async function(req, res) {
    try {
        const [rows] = await conexion.query('SELECT Numero_Expediente, Nombre_Pacientes, ApellidoPaterno_Pacientes, ApellidoMaterno_Pacientes, fecha_nacimiento_paciente FROM pacientes'); //Llamando a la vista
        res.json(rows); // Envía los datos como JSON
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

module.exports = router;