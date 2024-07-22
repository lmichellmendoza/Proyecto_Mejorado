const mysql = require('mysql2'); //Con mysql2 porque no me dejo con el 1

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Proyecto_Teleton3',
  password: 'Mendoza1239'
});

conexion.connect(function(e) {
  if (e) {
    console.error('Error de conexión:', e.message);
    return;
  }
  console.log('Conexión exitosa');
});

//conexion.end(); //Termina la conexion con la BD

module.exports=conexion;//Exporta la conexion