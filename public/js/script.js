/*const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

var formulario = document.getElementById('Login-Formulario'),
	username=formulario.Nombre,
	password=formulario.password,
	error=document.getElementById('error');

    function validarNombre(e) {
        if (username.value === '' || username.value == null) {
            console.log('Por favor completa el nombre');
            error.style.display = 'block';
            error.innerHTML = '<li> Ingresa el nombre </li>'; // Reiniciar el contenido de error
            e.preventDefault();
        }
    }
    
    function validarpassword(e) {
        if (password.value === '' || password.value == null) {
            console.log('Por favor ingresa tu contraseña');
            error.style.display = 'block';
            error.innerHTML += '<li> Ingresa tu contraseña </li>';
            e.preventDefault();
        }
    }

    formulario.addEventListener('submit', function(e) {
        // Limpiar el contenido de error al inicio de la validación
        error.innerHTML = '';
        error.style.display = 'none';
    
        // Validar ambos campos
        validarNombre(e);
        validarpassword(e);
    });
    */

    const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

var formulario = document.getElementById('Login-Formulario');
var username = document.getElementById('username');
var password = document.getElementById('password');
var error = document.getElementById('error');

function validarNombre(e) {
    if (username.value === '' || username.value == null) {
        console.log('Por favor completa el nombre');
        error.style.display = 'block';
        error.innerHTML += '<li> Ingresa el nombre </li>';
        e.preventDefault();
    }
}

function validarpassword(e) {
    if (password.value === '' || password.value == null) {
        console.log('Por favor ingresa tu contraseña');
        error.style.display = 'block';
        error.innerHTML += '<li> Ingresa tu contraseña </li>';
        e.preventDefault();
    }
}

formulario.addEventListener('submit', function(e) {
    // Limpiar el contenido de error al inicio de la validación
    error.innerHTML = '';
    error.style.display = 'none';

    // Validar ambos campos
    validarNombre(e);
    validarpassword(e);
});
