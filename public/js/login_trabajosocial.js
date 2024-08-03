//const { name } = require("ejs");


const loginButton = document.getElementById("login");
const container = document.getElementById("container");



 //Funcion del login:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var formulario = document.querySelector('#Login-trabajosocial form');
var username = document.getElementById('username');
var password = document.getElementById('password');
var error = document.getElementById('error');

function validarNombre() {
    if (username.value === '' || username.value == null) {
        error.style.display = 'block';
        error.innerHTML += '<li> Ingresa tu usuario </li>';
        return false;
    }
    return true;
}

function validarpassword() {
    if (password.value === '' || password.value == null) {
        error.style.display = 'block';
        error.innerHTML += '<li> Ingresa tu contraseña </li>';
        return false;
    }
    return true;
}

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    error.innerHTML = '';
    error.style.display = 'none';

    if (validarNombre() && validarpassword()) {
        const data = {
            username: username.value,
            password: password.value
        };

        fetch('/login_trabajosocial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Redirigir a otra página o realizar alguna acción en caso de login exitoso
                //window.location.href = '/menu'; // Ejemplo de redirección
                window.location.href = '/menu';
            } else {
                error.style.display = 'block';
                error.innerHTML += `<li>${result.message}</li>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            error.style.display = 'block';
            error.innerHTML += '<li>Error en el servidor</li>';
        });
    }
});