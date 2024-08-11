// Importar módulos y rutas al inicio del archivo
const express = require("express");
const path = require("path");
const directorRoutes = require('./controladores/login_director'); 
const medicoRoutes = require('./controladores/login_medico');
const recetaRoutes=require('./controladores/receta_medico');
const registrousuario=require('./controladores/registro');
const validaciones_sistema_director=require('./controladores/director_validaciones_sistema');
const registro_medicos_director=require('./controladores/director_registro_medicos');
const registro_pacientes_director=require('./controladores/director_registro_Pacientes');





const app = express();
app.use(express.json());

// Ruta para servir las vistas
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }));

// Ruta para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Aquí es donde utilizas las rutas
app.use('/', directorRoutes);
app.use('/', medicoRoutes);
app.use('/', recetaRoutes);
app.use('/', registrousuario);
app.use('/', validaciones_sistema_director);
app.use('/',registro_medicos_director);
app.use('/', registro_pacientes_director);

// El resto del código para rutas y lógica de la aplicación
app.get("/", function(req, res) {
    res.render("index_Roles");
});

app.get("/registro_nuevo",function(req,res){
    res.render("registro_usuario");
})

app.get("/login_medico",function(req,res){
    res.render("/cuadro_mando_medico");
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Conexión al servidor
app.listen(3000, function() {
    console.log("servidor configurado correctamente: http://localhost:3000");
});

