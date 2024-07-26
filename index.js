//CONEXION DEL BACK    
    const express = require("express");
    const mysql2 = require("mysql2"); //Libreria de mysql
    const path = require("path");
    const conexion = require("./conexion"); //Importamos el archivo de conexion 
    const bcrypt = require('bcrypt'); //Libreria bcrypt

    
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
    
    //::::::::::::::::::::::::::::::::::::::::FUNCION DE LOGIN::::::::::::::::::::::::::::::::::::::::::::::::::::
    app.post("/login", function(req, res) { // "/login" es el format del HTML
        const datos = req.body;  //Obtiene todo lo del documento
        let username = datos.username; //Que solo obtenga el dato de username
        let password = datos.password; //Que solo obtenga el dato de password
    

    
        let Login = "SELECT * FROM usuario WHERE username=? AND ContraseñaUsuario=?";
        conexion.query(Login, [username, password], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                res.status(500).send('Error en el servidor');
                return;
            }
    
            if (results.length > 0) {
                res.json({ success: true, message: 'Login exitoso' });  //Mensaje regresado al HTML
            } else {
                res.json({ success: false, message: 'Usuario o contraseña incorrectos' });  //Mensaje regresado al HTML
            }
        });
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //::::::::::::::::::::::::::::::::::::::::FUNCION DEL REGISTRO::::::::::::::::::::::::::::::::::::::::::::::::::::

 


    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    //::::::::::::::::::::::::::::::::::::::::CONEXIÓN CON EL SERVIDOR::::::::::::::::::::::::::::::::::::::::::::::::::::

    app.listen(3000, function() {
        console.log("servidor configurado correctamente: http://localhost:3000");
    });
    
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::