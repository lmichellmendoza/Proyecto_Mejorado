//const { name } = require("ejs");

    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");
    
    registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });
    
    loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });
    
     //Funcion del login:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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



document.addEventListener('DOMContentLoaded', (event) => {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropbtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    // Cerrar el menú desplegable si se hace clic fuera de él
    window.onclick = (event) => {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    };
});


// Funcion de Registro::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
/*
var formularioreg = document.getElementById('Formulario-Registro'),
    newuser=formularioreg.newuser //De aqui se extraen los del campo name del HTML
	Nombre=formularioreg.Nombre,
    apellidoP=formularioreg.apellidoP,
	apellidoM=formularioreg.apellidoM,
    newemail=formularioreg.newemail,
    password1=formularioreg.password1,
    password2=formularioreg.password2,
    celular=formularioreg.celular,
	error1=document.getElementById('error1');


    function validarUsuario(e1){
		if(newuser.value =='' || newuser.value == null)
		console.log('Por favor completa el nombre de usuario');
		error1.style.display = 'block';
		error1.innerHTML = error1.innerHTML + '<li> Por favor completa el nombre de usuario</li>';
		
        e1.preventDefault();	
	    } error1.style.display='none';
        

formulario.addEventListener('submit',validarUsuario);	  */


document.addEventListener('DOMContentLoaded', (event) => {
    const formularioReg = document.getElementById('Formulario-Registro');
    const error1 = document.getElementById('error1');

    const newuser = document.getElementById('newuser');
    const name = document.getElementById('name');
    const apellidoP = document.getElementById('apellidoP');
    const apellidoM = document.getElementById('apellidoM');
    const newemail = document.getElementById('newemail');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const celular = document.getElementById('celular');

    function mostrarError(mensaje) {
        error1.style.display = 'block';
        error1.innerHTML = `<li>${mensaje}</li>`;
    }

    function limpiarErrores() {
        error1.innerHTML = '';
        error1.style.display = 'none';
    }



    // Validar cada campo individualmente
    newuser.addEventListener('blur', () => {
        if (newuser.value === '' || newuser.value == null) {
            mostrarError('Por favor completa el nombre de usuario');
        } else {
            limpiarErrores();
        }
    });

    name.addEventListener('blur', () => {
        if (name.value === '' || name.value == null) {
            mostrarError('Por favor completa tu nombre completo');
        } else {
            limpiarErrores();
        }
    });

    newemail.addEventListener('blur', () => {
        if (newemail.value === '' || newemail.value == null) {
            mostrarError('Por favor ingresa tu correo electrónico');
        } else {
            limpiarErrores();
        }
    });

    password1.addEventListener('blur', () => {
        if (password1.value === '' || password1.value == null) {
            mostrarError('Por favor ingresa una contraseña');
        } else if (password1.value !== password2.value) {
            mostrarError('Las contraseñas no coinciden');
        } else {
            limpiarErrores();
        }
    });

    password2.addEventListener('blur', () => {
        if (password2.value !== password1.value) {
            mostrarError('Las contraseñas no coinciden');
        } else {
            limpiarErrores();
        }
    });

    celular.addEventListener('blur', () => {
        if (celular.value === '' || celular.value == null) {
            mostrarError('Por favor ingresa tu número de celular');
        } else {
            limpiarErrores();
        }
    });

    // Al enviar el formulario, verificar que todos los campos sean válidos
    formularioReg.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores();

        if (newuser.value === '' || name.value === '' || newemail.value === '' ||
            password1.value === '' || password1.value !== password2.value || celular.value === '') {
            mostrarError('Por favor completa todos los campos correctamente y revisa las contraseñas.');
           
            
        } else {
            {
               mostrarError('Tu solicitud ha sido envidada y será validada por un supervisor');
        
            }
        }
    });
});


