//::::::::::::::::::::. CON MYSQL PROMISE

const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('../conexion'); 
const cors = require('cors');
const router = express.Router();

// Habilitar CORS
router.use(cors());

// Ruta para la página de inicio de sesión del director
router.get("/cuadro_mando_medico", function(req, res) {
    res.render("cuadro_mando_medico"); // Corregido el nombre de la vista
});

// Ruta para obtener información del médico y especialidad
router.get("/receta-container", async function(req, res) { // Usamos async aquí
    try {
        const query = `
            SELECT 
                CONCAT(m.Nombre_Medico, ' ', m.Apellido_Paterno_Medico, ' ', m.Apellido_Materno_Medico) AS nombre,
                m.Cedula_Profesional_Medico as cedula,
                m.Escuela_Egresado_Medico as egresado,
                e.nombre_especialidad_medica as especialidad
            FROM 
                medico m
            JOIN 
                especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica;
        `;
        const [rows] = await conexion.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los médicos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los médicos' });
    }
});

module.exports = router;

