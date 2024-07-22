





    const express = require("express");
    const mysql2 = require("mysql2");
    const path = require("path");
    const conexion = require("./conexion");
    
    const app = express();
    
    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, 'views'));
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Ruta para servir archivos estáticos
    app.use('/public', express.static(path.join(__dirname, 'public')));
    
    app.get("/", function(req, res) {
        res.render("index");
    });
    
    app.post("/login", function(req, res) {
        const datos = req.body;
        let username = datos.username;
        let password = datos.password;
    
        if (!username || !password) {
            res.status(400).send('Faltan datos');
            return;
        }
    
        let Login = "SELECT * FROM usuario WHERE username=? AND ContraseñaUsuario=?";
        conexion.query(Login, [username, password], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                res.status(500).send('Error en el servidor');
                return;
            }
    
            if (results.length > 0) {
                res.send('Login exitoso');
            } else {
                res.send('Usuario o contraseña incorrectos');
            }
        });
    });
    
    app.listen(3000, function() {
        console.log("servidor configurado correctamente: http://localhost:3000");
    });
    