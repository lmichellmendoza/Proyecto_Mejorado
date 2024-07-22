/*
const express = require("express") //Importa la libreria

//Objeto para llamar los métos de express
const app =express();


//ruta inicial
app.get("/",function(req, res){
    res.send("Mensaje");
})

/*Redireccionando a rutas estaticas(carpeta)
app.use(express.static("public"));


//Creando el servidor
//1.Configurar el puerto usado el servidor local
app.listen(3000, function(){
    console.log("servidor configurado correctamente: http://localhost:3000");
});//En caso de errores 5000 o 8000


*/



//SERVIDOR LOCAL PARA PAGINAS DINAMICAS
/*const express = require("express");

const mysql2= require("mysql2");

const path = require("path"); // Importa el módulo path

const conexion=require("./conexion") //Importando el archivo conexion

const app= express();


app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine","ejs");//Motor de vistas
app.set('views', path.join(__dirname, 'views')); // Configura la ruta de las vistas


app.use(express.json());//Datos de paginas o de otra ubicacion
app.use(express.urlencoded({extended:false}));//Para que identifique los datos que viene de una página

app.get("/", function(req, res)
{
    res.render("index"); //Ruta para renderizar la vista (LA PANTALLA EN EJS)
})

app.post("/login",function(req,res){ // login es del FORMT
        const datos= req.body;//Aqui obtiene todo lo del documento y se guarda en variable
            //console.log(datos);//Mostrar los datos en consola

        let username=datos.username;
        let password=datos.password;  


            // Verificar que los valores no sean nulos
            if (!username || !password) {
                res.status(400).send('Faltan datos');
                return;
            }
        
            // Consulta a la base de datos para verificar el usuario
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

})//Validar con la funcion de login


app.listen(3000, function(){
    console.log("servidor configurado correctamente: http://localhost:3000")});

    */