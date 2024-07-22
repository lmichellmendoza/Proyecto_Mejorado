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
    
    var formulario = document.querySelector('#Login-Formulario form');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var error = document.getElementById('error');
    
    function validarNombre() {
        if (username.value === '' || username.value == null) {
            error.style.display = 'block';
            error.innerHTML += '<li> Ingresa el nombre </li>';
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
    
            fetch('/login', {
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
                    window.location.href = '/menu.html';
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
    
