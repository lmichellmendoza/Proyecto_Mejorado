const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// Ruta para la página de inicio de sesión del director
router.get("/login_medico", function(req, res) {
    res.render("login_medico");
});


router.post("/login_medico", function(req, res) { // "/login" es el format del HTML
    const datos_m = req.body;  //Obtiene todo lo del documento
    let username_m = datos_m.username; //Que solo obtenga el dato de username
    let password_m = datos_m.password; //Que solo obtenga el dato de password



    let Login = "SELECT * FROM usuario WHERE username=?";
conexion.query(Login, [username_m], (err, results) => {
if (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error en el servidor');
    return;
}

if (results.length > 0) {
    const user = results[0];
    if (user.ContraseñaUsuario === password_m) {
        if (user.idRol === 2) {
            res.json({ success: true, message: 'Login exitoso' });  // Login exitoso
        } else {
            res.json({ success: false, message: 'El usuario que desea acceder pertenece a otra área' });  // Rol incorrecto
        }
    } else {
        res.json({ success: false, message: 'Usuario o contraseña incorrectos' });  // Contraseña incorrecta
    }
} else {
    res.json({ success: false, message: 'Usuario o contraseña incorrectos' });  // Usuario no encontrado
}
});
});

// Ruta para la página del cuadro de mando del director
router.get("/cuadro_mando_medico", function(req, res) {
    res.render("cuadro_mando_medico");
});

module.exports = router;
