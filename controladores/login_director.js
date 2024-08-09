const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Asegúrate de que este camino es correcto.

// Ruta para la página de inicio de sesión del director
router.get("/login_director", function(req, res) {
    res.render("login_director");
});

// Función de login del director
router.post("/login_director", function(req, res) {
    const datos_d = req.body;  
    let username_d = datos_d.username; 
    let password_d = datos_d.password; 

    let Login = "SELECT * FROM usuario WHERE username=?";
    conexion.query(Login, [username_d], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            if (user.ContraseñaUsuario === password_d) {
                if (user.idRol === 3) {
                    res.json({ success: true, message: 'Login exitoso' });
                } else {
                    res.json({ success: false, message: 'El usuario que desea acceder pertenece a otra área' });
                }
            } else {
                res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Ruta para la página del cuadro de mando del director
router.get("/cuadro_mando_director", function(req, res) {
    res.render("cuadro_mando_director");
});

module.exports = router;



