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
    // Implement your logic here
    console.log("Pacientes button clicked");
}

function abrirReceta() {
    window.location.href = 'Receta_1.html';
}

function abrirVentanaRegistro() {
    // Implement your logic here
    console.log("Registrar Niño button clicked");
}

function abrirInf() {
    // Implement your logic here
    console.log("Escanear Receta button clicked");
}

function cerrarSesion() {
    // Implement your logic here
    console.log("Cerrar Sesión button clicked");
}
