const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Asegúrate de usar mysql2/promise para promesas
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las solicitudes

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  //database: 'CRIT',
  database: 'Proyecto_Teleton3',
  //password: 'manu11',
  password: 'Mendoza1239',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ruta para obtener los médicos con la consulta proporcionada
app.get('/medicos', async (req, res) => {
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
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los médicos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los médicos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
