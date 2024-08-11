
/*
const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para el hash

// Ruta para la página de inicio de sesión del director
router.get("/registro_usuario", function(req, res) {
    res.render("registro_usuario");
});

router.post('/auth/register', async function(req, res) {
    const datos_registro = req.body; // Lo que requiero del formulario
    console.log('Datos recibidos:', datos_registro); // Imprimo en consola 

    try {
        // Datos del formulario
        let username = datos_registro.newuser;
        let name = datos_registro.name;
        let apellidop = datos_registro.apellidoP;
        let apellidom = datos_registro.apellidoM;
        let email = datos_registro.newemail;
        let pass1 = datos_registro.password1; // Contraseña original
        let numcelular = datos_registro.celular;
        let rol = datos_registro.options;

        console.log('Procesando usuario:', username); // Imprimo el nombre de usuario en consola

        // Conectar a la base de datos
        const conn = await connection.getConnection();

        // Verificar si el usuario ya existe
        let buscar = "SELECT * FROM usuario WHERE username=?";
        let [results] = await conn.query(buscar, [username]);

        if (results.length > 0) {
            console.log("Este nombre de usuario ya existe, ingresa uno nuevo");
            res.json({ success: false, message: 'Este nombre de usuario ya existe, ingresa uno nuevo' });
            
            
        } else {
            // Cifrar la contraseña
            const hashedPassword = await bcrypt.hash(pass1, saltRounds);

            // Insertar usuario en la base de datos
            await conn.query(
                'CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [username, name, apellidop, apellidom, hashedPassword, email, numcelular, rol, 0] // Porque 0 es Inactivo
            );

            console.log('Usuario insertado con éxito');
            res.json({ success: true, message: 'Usuario registrado con éxito' });
        }

        // Liberar la conexión
        conn.release();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Error al procesar el registro' });
    }
});

module.exports = router;*/


//-------------------------------------------
const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para el hash

// Ruta para la página de registro de usuario
router.get("/registro_usuario", function(req, res) {
    res.render("registro_usuario");
});

router.post('/auth/register', async function(req, res) {
    const datos_registro = req.body; // Lo que requiero del formulario
    console.log('Datos recibidos:', datos_registro); // Imprimo en consola 

    try {
        // Datos del formulario
        let username = datos_registro.newuser;
        let name = datos_registro.name;
        let apellidop = datos_registro.apellidoP;
        let apellidom = datos_registro.apellidoM;
        let email = datos_registro.newemail;
        let pass1 = datos_registro.password1; // Contraseña original
        let numcelular = datos_registro.celular;
        let rol = datos_registro.options;

        console.log('Procesando usuario:', username); // Imprimo el nombre de usuario en consola

        // Conectar a la base de datos
        const conn = await connection.getConnection();

        // Verificar si el usuario ya existe
        let buscarUsuario = "SELECT * FROM usuario WHERE username=?";
        let [resultsUsuario] = await conn.query(buscarUsuario, [username]);

        if (resultsUsuario.length > 0) {
            console.log("Este nombre de usuario ya existe, ingresa uno nuevo");
            conn.release(); // Liberar la conexión antes de responder
            return res.json({ success: false, message: 'Este nombre de usuario ya existe, ingresa uno nuevo' });
        }

        // Verificar si el email ya está registrado
        let buscarEmail = "SELECT * FROM usuario WHERE CorreoElectronico=?";
        let [resultsEmail] = await conn.query(buscarEmail, [email]);

        if (resultsEmail.length > 0) {
            console.log("Este email ya fue registrado, ingresa uno nuevo");
            conn.release(); // Liberar la conexión antes de responder
            return res.json({ success: false, message: 'Este email ya fue registrado, ingresa uno nuevo' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(pass1, saltRounds);

        // Insertar usuario en la base de datos
        await conn.query(
            'CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, name, apellidop, apellidom, hashedPassword, email, numcelular, rol, 0] // Porque 0 es Inactivo
        );

        console.log('Usuario insertado con éxito');
        conn.release(); // Liberar la conexión después de la inserción
        res.json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Error al procesar el registro' });
    }
});

module.exports = router;
//************************************************* */





/*const express = require('express');      //::::::::::::::::::::Esto funciona con MYSQL PROMISE
const router = express.Router();
const connection = require('../conexionpromise');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para el hash



// Ruta para la página de inicio de sesión del director
router.get("/registro_usuario", function(req, res) {
    res.render("registro_usuario");
});

router.post('/auth/register', function(req, res) { //Se coloca la action del form
    const datos_registro = req.body; // Lo que requiero del formulario
    console.log(datos_registro); // Imprimo en consola 

    // Función asíncrona para manejar el proceso
    const procesarUsuario = async () => {
        try {
            // Datos del formulario
            let username = datos_registro.newuser;
            let name = datos_registro.name;
            let apellidop = datos_registro.apellidoP;
            let apellidom = datos_registro.apellidoM;
            let email = datos_registro.newemail;
            let pass1 = datos_registro.password1; // Contraseña original
            let numcelular = datos_registro.celular;
            let rol = datos_registro.options;

            let buscar= "SELECT *FROM usuario WHERE username=?";
            connection.query(buscar,[username],(err, results) => {
                if(err){
                    console.error('Error al ejecutar la consulta: ', err);
                    res.status(500).send('Error en el servidor');
                    return;
                }

                if (results.length>0){
                    console.log("Este nombre usuario ya existe, ingresa uno nuevo");
                    res.json({ success: false, message: 'Este nombre usuario ya existe, ingresa uno nuevo' });
                }
                else{

                    
                }
            })

// Cifrar la contraseña
const hashedPassword = await bcrypt.hash(pass1, saltRounds);

// Insertar usuario en la base de datos
connection.query(
    'CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, name, apellidop, apellidom, hashedPassword, email, numcelular, rol, 0], //Porque 0 es Inactivo
    (err, results) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            res.status(500).send('Error al registrar el usuario');
        } else {
            console.log('Usuario insertado con éxito:', results);
            res.status(200).send('Usuario registrado con éxito');
        }
        //connection.end();
    }
);
} catch (err) {
console.error('Error:', err);
res.status(500).send('Error al procesar el registro');
}
};

// Llamar a la función asíncrona
procesarUsuario();
});


            

module.exports = router;*/



//:::::::::::::::::::::::CON MYSQL2 (NO FUNCIONA)::::::::::::::::::::::::::::::::::::
/*const express = require('express');
const router = express.Router();
const connection = require('../conexion');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Ruta para la página de inicio de sesión del director
router.get("/registro_usuario", function(req, res) {
    res.render("registro_usuario");
});

router.post('/auth/register', function(req, res) { 
    const datos_registro = req.body; 
    console.log(datos_registro);

    // Datos del formulario
    let username = datos_registro.newuser;
    let name = datos_registro.name;
    let apellidop = datos_registro.apellidoP;
    let apellidom = datos_registro.apellidoM;
    let email = datos_registro.newemail;
    let pass1 = datos_registro.password1; 
    let numcelular = datos_registro.celular;
    let rol = datos_registro.options;

    // Consulta para verificar si el usuario ya existe
    let buscar = "SELECT * FROM usuario WHERE username=?";
    connection.query(buscar, [username], async (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error en el servidor');
            return;
        }

        if (results.length > 0) {
            console.log("Este nombre usuario ya existe, ingresa uno nuevo");
            res.json({ success: false, message: 'Este nombre usuario ya existe, ingresa uno nuevo' });
        } else {
            try {
                // Cifrar la contraseña de manera asíncrona
                const hashedPassword = await bcrypt.hash(pass1, saltRounds);

                // Insertar usuario en la base de datos
                connection.query(
                    'CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [username, name, apellidop, apellidom, hashedPassword, email, numcelular, rol, 0], 
                    (err, results) => {
                        if (err) {
                            console.error('Error al insertar el usuario:', err);
                            res.status(500).send('Error al registrar el usuario');
                        } else {
                            console.log('Usuario insertado con éxito:', results);
                            res.status(200).send('Usuario registrado con éxito');
                        }
                    }
                );
            } catch (err) {
                console.error('Error al cifrar la contraseña:', err);
                res.status(500).send('Error al procesar el registro');
            }
        }
    });
});

module.exports = router; */
