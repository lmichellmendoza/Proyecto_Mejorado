
//:::::::::::::::::::::::::::::.CON MYSQL PROMISE

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Asegúrate de que bcrypt esté importado
const conexion = require('../conexion'); // Asumo que esta es una conexión de mysql2/promise

// Ruta para la página de inicio de sesión del director
router.get("/login_medico", function(req, res) {
    res.render("login_medico");
});

router.post("/login_medico", async function(req, res) { // Usamos async aquí
    const datos_m = req.body;  // Obtiene todo lo del documento
    let username_m = datos_m.username; // Que solo obtenga el dato de username
    let password_m = datos_m.password; // Que solo obtenga el dato de password

    try {
        let Login = "SELECT * FROM usuario WHERE username=?";
        const [results] = await conexion.execute(Login, [username_m]); // Ejecuta la consulta

        if (results.length > 0) {
            const user = results[0];
            // Comparamos la contraseña cifrada con la ingresada
            const match = await bcrypt.compare(password_m, user.ContraseñaUsuario);

            if (match) {
                if (user.idRol === 2) {
                    if (user.idStatus === 1) {
                        res.json({ success: true, message: 'Login exitoso' });
                    } else {
                        res.json({ success: false, message: 'Tu solicitud sigue en validación' });
                    }
                } else {
                    res.json({ success: false, message: 'El usuario que desea acceder pertenece a otra área' });
                }
            } else {
                res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Recuperación del botón de inicio de sesión cuando coinciden los valores
router.get("/cuadro_mando_medico", function(req, res) {
    res.render("cuadro_mando_medico");
});

module.exports = router;
