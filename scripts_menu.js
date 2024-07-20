console.log("El archivo script_menu.js se ha cargado correctamente");

document.getElementById('btn_ayuda').addEventListener('click', function() {
    ayuda();
});

document.getElementById('btn_receta').addEventListener('click', function() {
    abrirReceta();
});

document.getElementById('btn_registro').addEventListener('click', function() {
    abrirVentanaRegistro();
});

document.getElementById('btn_escanear').addEventListener('click', function() {
    abrirInf();
});

document.getElementById('btn_cerrar_sesion').addEventListener('click', function() {
    cerrarSesion();
});

function ayuda() {
    window.location.href = 'Pacientes.html';
}

function abrirReceta() {
    window.location.href = 'Receta_1.html';
}

function abrirVentanaRegistro() {
    window.location.href = 'RegistrarNino.html';
}

function abrirInf() {
    window.location.href = 'EscanearReceta.html';
}

function cerrarSesion() {
    window.location.href = 'index.html';
}

