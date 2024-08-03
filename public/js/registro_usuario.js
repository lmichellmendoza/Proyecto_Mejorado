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
