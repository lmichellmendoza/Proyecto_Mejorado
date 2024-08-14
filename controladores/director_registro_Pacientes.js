const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

//Para mostrar la tabla de pacientes

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

//Para el registro de pacientes
router.post("/formulario_registro_paciente", async function(req, res){
    const datos_registro_pacientes = req.body; 
    console.log('Datos recibidos:', datos_registro_pacientes);

    try {
        let numero_expediente = datos_registro_pacientes.numero_expediente_paciente;
        let nombre_paciente = datos_registro_pacientes.nombre_pacientef;
        let ap_paciente = datos_registro_pacientes.a_paterno_paciente;
        let am_paciente = datos_registro_pacientes.a_materno_paciente;
        let fecha_paciente= datos_registro_pacientes.fecha_nacimiento_paciente;
        let paciente_status=1;
        console.log('Procesando Paciente:', nombre_paciente);

        const conn = await conexion.getConnection(); 
        

        let buscarPaciente = 'SELECT * FROM Pacientes WHERE Numero_Expediente=?';
        let [resultado] = await conn.query(buscarPaciente, [numero_expediente]);

        if (resultado.length > 0) {
            console.log("Esta número de expediente ya fue registrado");
           // alert("Esta número de expediente ya fue registrado");
            conn.release(); // Libera la conexión
            return res.json({ success: false, message: 'Esta cédula ya fue registrada' });
        } else {
            await conn.query(
                'CALL insertar_Pacientes(?,?,?,?,?,?)',
                [numero_expediente,nombre_paciente,ap_paciente,am_paciente,fecha_paciente,paciente_status]
            );
            
            console.log('Paciente registrado con éxito!');
            conn.release();
            res.json({ success: true, message: 'Paciente insertado con éxito' });
        }
    } catch (err) {
        console.error('Error al procesar el registro:', err);
        res.status(500).json({ success: false, message: 'Error al procesar el registro' });
    }
});

//Funciones de botones
//eliminar paciente
router.post('/boton_eliminar_paciente/:id', async (req, res) => {
    const nexpediente = req.params.id; // Cambiado a req.params.id
    if (!nexpediente || isNaN(nexpediente)) {
        return res.status(400).json({ message: 'Número de expediente no válido' });
    }
    try {
        await conexion.query('DELETE FROM Pacientes WHERE Numero_Expediente=?', [nexpediente]);
        res.status(200).json({ message: 'La solicitud ha sido rechazada' });
        console.log("Paciente eliminado");
    } catch (error) {
        console.error('Error al rechazar la solicitud:', error);
        res.status(500).json({ message: 'Error al rechazar la solicitud' });
    }
});

module.exports = router;


module.exports = router;