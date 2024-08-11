/*const express = require('express');   //::::::::::::::CON MYSQL2
const router = express.Router();
const conexion = require('../conexion');

// Ruta para la página de inicio de sesión del director
router.get("/cuadro_mando_medico", function(req, res) {
    res.render("cuador_mando_medico");
});

router.post("/receta-container", function(req, res) {
    let query = `SELECT 
    
                    m.Nombre_Medico, 
                    m.Apellido_Paterno_Medico, 
                    m.Apellido_Materno_Medico, 
                    m.Cedula_Profesional_Medico, 
                    m.Escuela_Egresado_Medico, 
                    e.Nombre_Especialidad_Medica 
                FROM 
                    medico m
                JOIN
                    especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica`;

    conexion.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

module.exports = router;*/


//::::::::::::::::::::. CON MYSQL PROMISE

const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Asegúrate de que este camino es correcto

// Ruta para la página de inicio de sesión del director
router.get("/cuadro_mando_medico", function(req, res) {
    res.render("cuadro_mando_medico"); // Corregido el nombre de la vista
});

// Ruta para obtener información del médico y especialidad
router.post("/receta-container", async function(req, res) { // Usamos async aquí
    let query = `
        SELECT 
            m.Nombre_Medico, 
            m.Apellido_Paterno_Medico, 
            m.Apellido_Materno_Medico, 
            m.Cedula_Profesional_Medico, 
            m.Escuela_Egresado_Medico, 
            e.Nombre_Especialidad_Medica 
        FROM 
            medico m
        JOIN
            especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica
    `;

    try {
        const [results] = await conexion.execute(query); // Ejecuta la consulta
        res.json(results);
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
