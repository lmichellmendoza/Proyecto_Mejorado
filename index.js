const express = require("express") //Importa la libreria

//Objeto para llamar los métos de express
const app =express();


//ruta inicial
app.get("/",function(req, res){
    res.send("Mensaje");
})

/*Redireccionando a rutas estaticas(carpeta)
app.use(express.static("public"));*/


//Creando el servidor
//1.Configurar el puerto usado el servidor local
app.listen(3000, function(){
    console.log("servidor configurado correctamente: http://localhost:3000");
});//En caso de errores 5000 o 8000
