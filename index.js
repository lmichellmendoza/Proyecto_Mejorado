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
    //

//************************** PANTALLA DE INDEX_ROLES ****************************
//Botones Funcionando   
    app.get("/", function(req, res) {
        res.render("index_Roles");
    });


    //BOTON DIRECTOR
    app.get("/login_director", function(req,res){
        res.render("login_director");
    })
    //BOTON TRABAJO SOCIAL
    app.get("/login_trabajosocial", function(req,res){
        res.render("login_trabajosocial");
    })

    //BOTON MEDICO
    app.get("/login_medico", function(req,res){
        res.render("login_medico");
    })

    app.get("/registro_nuevo",function(req,res){
        res.render("registro_usuario");
    })

//::::::::::::::::::::::::::::::::::::::::FUNCION DE LOGIN DIRECTOR::::::::::::::::::::::::::::::::::::::::::::::::::::
    app.post("/login_director", function(req, res) { // "/login" es el format del HTML
        const datos_d = req.body;  //Obtiene todo lo del documento
        let username_d = datos_d.username; //Que solo obtenga el dato de username
        let password_d = datos_d.password; //Que solo obtenga el dato de password
    

    
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


    //Recuperacion del boton de inicio de sesión cuando coinciden los valores
    app.get("/cuadro_mando_director",function(req,res){
        res.render("cuadro_mando_director");
    })

//::::::::::::::::::::::::::::::::::::::::FUNCION DE LOGIN MEDICO::::::::::::::::::::::::::::::::::::::::::::::::::::
    app.post("/login_medico", function(req, res) { // "/login" es el format del HTML
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

        //Recuperacion del boton de inicio de sesión cuando coinciden los valores
        app.get("/cuadro_mando_medico",function(req,res){
            res.render("cuadro_mando_medico");
        })


//::::::::::::::::::::::::::::::::::::::::FUNCION DE LOGIN TRABAJO SOCIAL::::::::::::::::::::::::::::::::::::::::::::::::::::
    app.post("/login_trabajosocial", function(req, res) { // "/login" es el format del HTML
        const datos_ts = req.body;  //Obtiene todo lo del documento
        let username_ts = datos_ts.username; //Que solo obtenga el dato de username
        let password_ts= datos_ts.password; //Que solo obtenga el dato de password
    

    
        let Login = "SELECT * FROM usuario WHERE username=?";
conexion.query(Login, [username_ts], (err, results) => {
    if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error en el servidor');
        return;
    }

    if (results.length > 0) {
        const user = results[0];
        if (user.ContraseñaUsuario === password_ts) {
            if (user.idRol === 1) {
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








    //::::::::::::::::::::::::::::::::::::::::FUNCION DE LOGIN GENERAL::::::::::::::::::::::::::::::::::::::::::::::::::::
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

    //::::::::::::::::::::::::::::::::::::::::FUNCION DE LA RECETA MEDICA::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Para obtener los valores de los medicos
// Ruta para obtener todos los médicos
/*app.post("/receta-container", function(req, res) {
    let query = `SELECT 
                    m.Nombre_Medico, 
                    m.Apellido_Paterno_Medico, 
                    m.Apellido_Materno_Medico, 
                    m.Cedula_Profesional_Medico, 
                    m.Escuela_Egresado_Medico, 
                    e.Nombre_Especialidad_Medica 
                FROM 
                    medico m
                JOIN
                    especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica`;

    conexion.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});
*/

// Obtener todos los médicos
app.post("/receta-container", function(req, res) {
    let query = `SELECT 
                    m.Nombre_Medico, 
                    m.Apellido_Paterno_Medico, 
                    m.Apellido_Materno_Medico, 
                    m.Cedula_Profesional_Medico, 
                    m.Escuela_Egresado_Medico, 
                    e.Nombre_Especialidad_Medica 
                FROM 
                    medico m
                JOIN
                    especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica`;

    conexion.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

// Obtener detalles del médico basado en el nombre completo
app.post("/detalles-medico", function(req, res) {
    let nombreCompleto = req.body.nombreCompleto;
    let [nombre, apellidoPaterno, apellidoMaterno] = nombreCompleto.split(' ');

    let query = `SELECT 
                    m.Nombre_Medico, 
                    m.Apellido_Paterno_Medico, 
                    m.Apellido_Materno_Medico, 
                    m.Cedula_Profesional_Medico, 
                    m.Escuela_Egresado_Medico, 
                    e.Nombre_Especialidad_Medica 
                FROM 
                    medico m
                JOIN
                    especialidad_medica e ON m.idEspecialidad_Medica = e.idEspecialidad_Medica
                WHERE 
                    m.Nombre_Medico = ? AND
                    m.Apellido_Paterno_Medico = ? AND
                    m.Apellido_Materno_Medico = ?`;

    conexion.query(query, [nombre, apellidoPaterno, apellidoMaterno], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});



    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::






    //::::::::::::::::::::::::::::::::::::::::CONEXIÓN CON EL SERVIDOR::::::::::::::::::::::::::::::::::::::::::::::::::::

    app.listen(3000, function() {
        console.log("servidor configurado correctamente: http://localhost:3000");
    });
    
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::