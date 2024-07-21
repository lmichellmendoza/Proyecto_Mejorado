const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para manejar el inicio de sesión
router.post('/index.html', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM usuario WHERE username = ? AND ContraseñaUsuario = ?', [username, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) {
            res.redirect('/menu.html');
        } else {
            res.send('Usuario o contraseña incorrectos');
        }
    });
});

// Ruta para manejar el registro

router.post('/index.html', (req, res) => {
    const { username, fullname, lastname, maternalname, email, password } = req.body;
    db.query('INSERT INTO usuario (username, nombreUsuario, ApellidoUsuario, ApellidoMaternoUsuario, ContraseñaUsuario,CorreoElectronico, NumeroCelularUsuario, idRol, idStatus) VALUES (?, ?, ?, ?, ?, ?,1,1)', 
             [username, fullname, lastname, maternalname, email, password], (err) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        res.send('Registro exitoso');
    });
});

module.exports = router;
