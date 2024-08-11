const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

//La ruta de la pagina de donde se obtiene la info
router.get("/validacion_usuarios", async function(req, res) {
    try {
        const [rows] = await conexion.query('SELECT * FROM vista_solicitud_sistema'); //Llamando a la vista
        res.json(rows); // Envía los datos como JSON
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos');
    }
});

router.post('/boton_aceptar/:id', async (req, res) => {
    const id = req.params.id; // Requiero el dato de usuario
    console.log('ID recibido:', id); // Agregar esta línea
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }
    try {
        await conexion.query('UPDATE usuario SET idStatus=1 WHERE idUsuario=?', [id]);
        res.status(200).json({ message: 'La solicitud ha sido aceptada' });
    } catch (error) {
        console.error('Error al aceptar la solicitud:', error);
        res.status(500).json({ message: 'Error al aceptar la solicitud' });
    }
});


router.post('/boton_rechazar/:id', async (req, res) => {
    const id = req.params.id; // Requiero el dato de usuario
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }
    try {
        await conexion.query('DELETE FROM usuario WHERE idUsuario=?', [id]);
        res.status(200).json({ message: 'La solicitud ha sido rechazada' });
    } catch (error) {
        console.error('Error al rechazar la solicitud:', error);
        res.status(500).json({ message: 'Error al rechazar la solicitud' });
    }
});

module.exports = router;

