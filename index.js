// Importar módulos y rutas al inicio del archivo
const express = require("express");
const path = require("path");
const directorRoutes = require('./controladores/login_director'); // Asegúrate de que esto esté antes de usar app.use
const medicoRoutes = require('./controladores/login_medico');
const recetaRoutes=require('./controladores/receta_medico');
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Aquí es donde utilizas las rutas
app.use('/', directorRoutes);
app.use('/', medicoRoutes);
app.use('/', recetaRoutes);

// El resto del código para rutas y lógica de la aplicación
app.get("/", function(req, res) {
    res.render("index_Roles");
});
app.get("/registro_nuevo",function(req,res){
    res.render("registro_usuario");
})


// Conexión al servidor
app.listen(3000, function() {
    console.log("servidor configurado correctamente: http://localhost:3000");
});

