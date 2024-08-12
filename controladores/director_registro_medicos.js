const express = require('express');
const router = express.Router();
const conexion = require('../conexion');


//const getConnection = require('../conexion'); // Ajusta la ruta al archivo correcto
//const pool = require('./conexion');
// La ruta de la página de donde se obtiene la info

//Para el menu desplegable

router.get('/areas', async (req, res) => {
    try {
        // Obtén la conexión a la base de datos
        const connection = await conexion.getConnection();
        
        // Ejecuta la consulta para obtener las áreas
        const [rows] = await connection.query('SELECT * FROM especialidad_medica');
        
        // Libera la conexión
        connection.release();
        
        // Devuelve los datos en formato JSON
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las áreas:', error);
        res.status(500).send('Error al obtener las áreas');
    }
});





//Para la tabla de todos los medicos que se tienen registrados
router.get("/registro_medico", async function(req, res) {
    try {
        const [rows] = await conexion.query('SELECT * FROM vista_registro_medico'); //Llamando a la vista
        res.json(rows); // Envía los datos como JSON
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

//Registro de Medicos
router.post('/formulario_registro_medico', async function (req, res) {
    const datos_registro_medicos = req.body; 
    console.log('Datos recibidos:', datos_registro_medicos);

    try {
        let nombre_medico = datos_registro_medicos.nombre_medico;
        let apellidop = datos_registro_medicos.apellidop_medico;
        let apellidom = datos_registro_medicos.apellidom_medico;
        let cedulam = datos_registro_medicos.cedula_medico;
        let especialidad_medico = datos_registro_medicos.especialidad_medica;
        let escuela_egresado=datos_registro_medicos.escuela_egresado; //Esto son los del JS
        console.log('Procesando Médico:', nombre_medico);

        const conn = await conexion.getConnection(); 

        let buscarMedico = 'SELECT * FROM medico WHERE Cedula_Profesional_Medico=?';
        let [resultado] = await conn.query(buscarMedico, [cedulam]);

        if (resultado.length > 0) {
            console.log("Esta cédula profesional ya fue registrada");
            conn.release(); // Libera la conexión
            return res.json({ success: false, message: 'Esta cédula ya fue registrada' });
        } else {
            await conn.query(
                'CALL insertar_medico(?,?,?,?,?,?)',
                [nombre_medico, apellidop, apellidom, cedulam,escuela_egresado ,especialidad_medico]
            );
            
            console.log('Médico registrado con éxito!');
            conn.release();
            res.json({ success: true, message: 'Médico insertado con éxito' });
        }
    } catch (err) {
        console.error('Error al procesar el registro:', err);
        res.status(500).json({ success: false, message: 'Error al procesar el registro' });
    }
});


module.exports = router;
