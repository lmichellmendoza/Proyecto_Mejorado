document.addEventListener('DOMContentLoaded', function() {
    const userID = '123'; // Aquí pones el ID del usuario logueado

    // Función para obtener datos del usuario basado en el ID (ejemplo)
    function getUserData(userID) {
        // Simulación de una llamada a API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: userID,
                    name: 'Juan Pérez',
                    profilePicture: 'public/images/Profile-Avatar-PNG.png'
                });
            }, 1000);
        });
    }

    // Obtener los datos del usuario y actualizar la interfaz
    getUserData(userID).then(user => {
        document.getElementById('profile-picture').src = user.profilePicture;
        document.getElementById('user-name').textContent = user.name;
    });

    // Mostrar y ocultar el menú
    document.getElementById('open-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.add('show');
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('show');
    });

    document.getElementById('sidebar').addEventListener('mouseleave', function() {
        document.getElementById('sidebar').classList.remove('show');
    });
});


$(document).ready(function() {
    // Mostrar la sección correspondiente al hacer clic en un botón del menú
    $('.tab-button').on('click', function() {
        var tabId = $(this).data('tab');
        
        // Ocultar todas las secciones
        $('.content-section').hide();
        
        // Mostrar la sección correspondiente
        $('#' + tabId + '-seccion').show();
        
        // Activar el botón clicado
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
    });




    // Inicializar el calendario
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        events: getSavedCitas() // Cargar eventos guardados en el calendario
    });
    calendar.render();

    // Agregar cita al formulario
    $('#add-cita-form').on('submit', function(event) {
        event.preventDefault();
        var fecha = $('#fecha').val();
        var hora = $('#hora').val();
        var paciente = $('#paciente').val();
        var descripcion = $('#descripcion').val();

        // Agregar la cita a la tabla
        $('#agenda-table tbody').append(`
            <tr>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${paciente}</td>
                <td>${descripcion}</td>
                <td><button class="delete-btn">Eliminar</button></td>
            </tr>
        `);

        // Agregar la cita al calendario
        calendar.addEvent({
            title: `Consulta con ${paciente}`,
            start: `${fecha}T${hora}`,
            allDay: false
        });

        // Guardar las citas en localStorage
        saveCitas();

        // Limpiar el formulario
        $(this).trigger('reset');
    });

    // Eliminar cita al hacer clic en el botón de eliminar
    $('#agenda-table').on('click', '.delete-btn', function() {
        var paciente = $(this).closest('tr').find('td').eq(2).text();
        $(this).closest('tr').remove();
        saveCitas(); // Guardar las citas actualizadas

        // Eliminar la cita del calendario
        calendar.getEvents().forEach(event => {
            if (event.title.includes(paciente)) {
                event.remove();
            }
        });
    });

    // Función para guardar citas en localStorage
    function saveCitas() {
        var citas = [];
        $('#agenda-table tbody tr').each(function() {
            var $row = $(this);
            citas.push({
                fecha: $row.find('td').eq(0).text(),
                hora: $row.find('td').eq(1).text(),
                paciente: $row.find('td').eq(2).text(),
                descripcion: $row.find('td').eq(3).text()
            });
        });
        localStorage.setItem('citas', JSON.stringify(citas));
    }

    // Función para recuperar citas de localStorage
    function getSavedCitas() {
        var citas = JSON.parse(localStorage.getItem('citas')) || [];
        return citas.map(cita => ({
            title: `Consulta con ${cita.paciente}`,
            start: `${cita.fecha}T${cita.hora}`,
            allDay: false
        }));
    }
});


//::::::::::::::::::::::::PARA LAS VALIDACIONES DEL SISTEMA:::::::::::::::::::::::

        // Función que se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    fetch('/validacion_usuarios') // Llama a la ruta API que devuelve los datos de la vista
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            const tbody = document.querySelector('#tabla-validaciones tbody'); 
                tbody.innerHTML = ''; // Limpiar el contenido actual
                    // Recorre cada usuario y añade una fila a la tabla
                    data.forEach(usuario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                            <td>${usuario.username}</td>
                            <td>${usuario.nombreUsuario} ${usuario.ApellidoUsuario} ${usuario.ApellidoMaternoUsuario}</td>
                            <td>${usuario.Nombre_Rol}</td>
                            <td>${usuario.CorreoElectronico}</td>
                            <td>${usuario.NumeroCelularUsuario}</td>
                            </td>
                            <button class="btn-aceptar" data-id="${usuario.idUsuario}">Aceptar</button>
                            <button class="btn-rechazar" data-id="${usuario.idUsuario}">Rechazar</button>
                            </td>
                        `;
                        tbody.appendChild(tr);
                 // Añadir eventos a los botones
                tr.querySelector('.btn-aceptar').addEventListener('click', () => {
                    const id = tr.querySelector('.btn-aceptar').getAttribute('data-id');
                    if (id) {
                        fetch(`/boton_aceptar/${id}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            tr.remove(); // Elimina la fila de la tabla
                        })
                        .catch(error => console.error('Error:', error));
                    } else {
                        alert('ID no válido');
                    }
                });

                tr.querySelector('.btn-rechazar').addEventListener('click', () => {
                    const id = tr.querySelector('.btn-rechazar').getAttribute('data-id');
                    if (id) {
                        fetch(`/boton_rechazar/${id}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            tr.remove(); // Elimina la fila de la tabla
                        })
                        .catch(error => console.error('Error:', error));
                    } else {
                        alert('ID no válido');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});



//::::::::::::::::::.PARA LOS REGISTROS DE MEDICOS:::::::::::::::::

//Para Menú desplegable
$.ajax({
    url: '/areas', // endpoint que devuelve las áreas
    method: 'GET', // debe de coincidir con el del back 
    success: function(especialidades) {
        $("#options_especialidadm").empty(); // Limpiar opciones existentes
        especialidades.forEach(function(especialidad) {
            const option = new Option(especialidad.Nombre_Especialidad_Medica, especialidad.idEspecialidad_Medica);
            $("#options_especialidadm").append(option);
        });
    },
    error: function(error) {
        console.error('Error al obtener las áreas:', error);
    }
});



//Para la tabla de Médicos
document.addEventListener('DOMContentLoaded', () => {
    fetch('/registro_medico') // Llama a la ruta API que devuelve los datos de la vista
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            const tbody = document.querySelector('#rm_tabla tbody'); 

            tbody.innerHTML = ''; // Limpiar el contenido actual

            // Recorre cada médico y añade una fila a la tabla
            data.forEach(medico => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${medico.Cedula_Profesional_Medico}</td>
                <td>${medico.Nombre_Medico} ${medico.Apellido_Paterno_Medico} ${medico.Apellido_Materno_Medico}</td>
                <td>${medico.Nombre_Especialidad_Medica}</td>
                <td>${medico.Escuela_Egresado_Medico}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});


//Para el registro de médicos

document.addEventListener('DOMContentLoaded', (event) => {
    const formulario_medico = document.getElementById('medicoForm');

    formulario_medico.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        try {
            const response = await fetch('/formulario_registro_medico', { // Asegúrate de que la ruta tenga el "/" inicial
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_medico: document.getElementById('nombre').value,
                    apellidop_medico: document.getElementById('ap_medico').value,
                    apellidom_medico: document.getElementById('am_medico').value,
                    cedula_medico: document.getElementById('cedula').value,
                    especialidad_medica: document.getElementById('options_especialidadm').value,
                    escuela_egresado:document.getElementById('escuela_egresado').value
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Médico registrado con éxito');
                formulario_medico.reset(); // Resetea el formulario después del registro exitoso
                actualizarTablaMedicos();
            } else {
                alert(data.message || 'Hubo un problema con la solicitud');
               // mostrarError('El usuario no puede ser registrado, revisa los datos ingresados');
            }
        } catch (error) {
            console.error('Error al enviar los datos: ', error);
        }
    });
});

//Para actualizar la tabla despues de que se agregue
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaMedicos();
});

async function actualizarTablaMedicos() {
    try {
        const response = await fetch('/registro_medico');
        const data = await response.json();

        const tbody = document.querySelector('#rm_tabla tbody');
        tbody.innerHTML = ''; // Limpiar el contenido actual

        data.forEach(medico => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${medico.Cedula_Profesional_Medico}</td>
                <td>${medico.Nombre_Medico} ${medico.Apellido_Paterno_Medico} ${medico.Apellido_Materno_Medico}</td>
                <td>${medico.Nombre_Especialidad_Medica}</td>
                <td>${medico.Escuela_Egresado_Medico}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}



//::::::::::::::::::::::PARA LOS REGISTROS PACIENTES:::::::::::::::::::::::::::::::::::::::::::



document.addEventListener('DOMContentLoaded', () => {
    const formulario_paciente = document.getElementById('pacientesForm');
    const error1 = document.getElementById('error1');

    // FUNCIONES PARA MANEJO DE ERRORES
    function mostrarError(mensaje) {
        error1.style.display = 'block';
        error1.innerHTML = `<li>${mensaje}</li>`;
    }

    function limpiarErrores() {
        error1.innerHTML = '';
        error1.style.display = 'none';
    }

    // CARGA INICIAL DE LA TABLA
    fetch('/registro_pacientes_director')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#rp_tabla tbody'); 
            tbody.innerHTML = ''; // Limpiar el contenido actual

            data.forEach(paciente => {
                // Formatear la fecha de nacimiento para que se muestre solo la fecha
                const fechaNacimiento = new Date(paciente.fecha_nacimiento_paciente).toLocaleDateString();

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${paciente.Numero_Expediente}</td>
                    <td>${paciente.Nombre_Pacientes}</td>
                    <td>${paciente.ApellidoPaterno_Pacientes}</td>
                    <td>${paciente.ApellidoMaterno_Pacientes}</td>
                    <td>${fechaNacimiento}</td>
                    <td>
                    <button class="btn-modificar_paciente" data-id="${paciente.Numero_Expediente}">Modificar</button>
                    <button class="btn-eliminar_paciente" data-id="${paciente.Numero_Expediente}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);

                tr.querySelector('.btn-modificar_paciente').addEventListener('click', () => { //Modificar Paciente
                    const ne = tr.querySelector('.btn-modificar_paciente').getAttribute('data-id');
                    if (ne) {
                        fetch(`/boton_modificar_paciente/${ne}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            tr.remove(); // Elimina la fila de la tabla
                        })
                        .catch(error => console.error('Error:', error));
                    } else {
                        alert('Número de expediente no válido');
                    }
                });  

                tr.querySelector('.btn-eliminar_paciente').addEventListener('click', () => {
                    const ne = tr.querySelector('.btn-eliminar_paciente').getAttribute('data-id');
                    if (ne) {
                        fetch(`/boton_eliminar_paciente/${ne}`, { // Cambiado de en a ne
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            tr.remove(); // Elimina la fila de la tabla
                        })
                        .catch(error => console.error('Error:', error));
                    } else {
                        alert('Número de expediente no válido');
                    }
                });
                
                
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    // ENVÍO DE FORMULARIO PARA REGISTRAR PACIENTE
    formulario_paciente.addEventListener('submit', async (event) => {
        event.preventDefault();

        limpiarErrores();  // Limpiar errores antes de hacer la solicitud

        try {
            const response1 = await fetch('/formulario_registro_paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    numero_expediente_paciente: document.getElementById("rp_numero_expediente").value,
                    nombre_pacientef: document.getElementById("rp_nombre").value,
                    a_paterno_paciente: document.getElementById("rap_paciente").value,
                    a_materno_paciente: document.getElementById("ram_paciente").value,
                    fecha_nacimiento_paciente: document.getElementById("rp_fechaNacimiento").value
                })
            });

            const data = await response1.json();

            if (data.success) {
                mostrarError("Paciente registrado con éxito!");
                formulario_paciente.reset();
                await actualizarTablaPacientes(); // Llama a la función de actualización
            } else {
                mostrarError(data.message || 'Hubo un problema con la solicitud');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            mostrarError('Error al enviar los datos al servidor.');
        }
    });

    // FUNCIÓN PARA ACTUALIZAR LA TABLA DE PACIENTES
    async function actualizarTablaPacientes() {
        try {
            const response = await fetch('/registro_pacientes_director');
            const data = await response.json();
    
            const tpbody = document.querySelector('#rp_tabla tbody');
            tpbody.innerHTML = ''; // Limpiar el contenido actual
    
            data.forEach(paciente => {
                const fechaNacimiento = new Date(paciente.fecha_nacimiento_paciente).toLocaleDateString();
    
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td contenteditable="false">${paciente.Numero_Expediente}</td>
                    <td contenteditable="false">${paciente.Nombre_Pacientes}</td>
                    <td contenteditable="false">${paciente.ApellidoPaterno_Pacientes}</td>
                    <td contenteditable="false">${paciente.ApellidoMaterno_Pacientes}</td>
                    <td contenteditable="false">${fechaNacimiento}</td>
                    <td>
                        <button class="btn-modificar_paciente" data-id="${paciente.Numero_Expediente}">Modificar</button>
                        <button class="btn-eliminar_paciente" data-id="${paciente.Numero_Expediente}">Eliminar</button>
                    </td>
                `;
                tpbody.appendChild(tr);
    
                // Manejo de evento para "Modificar"
                const btnModificar = tr.querySelector('.btn-modificar_paciente');
                btnModificar.addEventListener('click', () => { 
                    console.log('Botón Modificar clicado');
    
                    const numeroExpediente = btnModificar.getAttribute('data-id');
                    const celdas = tr.querySelectorAll('td:not(:last-child)');
    
                    if (btnModificar.textContent === 'Modificar') {
                        // Habilitar la edición
                        celdas.forEach(celda => {
                            celda.setAttribute('contenteditable', 'true');
                            celda.style.backgroundColor = '#f0f0f0'; // Indicar que es editable
                        });
                        btnModificar.textContent = 'Guardar';
                    } else {
                        // Deshabilitar la edición y guardar cambios
                        const datosActualizados = {
                            Numero_Expediente: celdas[0].textContent,
                            Nombre_Pacientes: celdas[1].textContent,
                            ApellidoPaterno_Pacientes: celdas[2].textContent,
                            ApellidoMaterno_Pacientes: celdas[3].textContent,
                            fecha_nacimiento_paciente: new Date(celdas[4].textContent).toISOString()
                        };
    
                        fetch(`/boton_modificar_paciente/${numeroExpediente}`, {
                            method: 'PUT', // Cambié a PUT ya que es una actualización
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(datosActualizados)
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            celdas.forEach(celda => {
                                celda.setAttribute('contenteditable', 'false');
                                celda.style.backgroundColor = ''; // Restaurar color original
                            });
                            btnModificar.textContent = 'Modificar';
                        })
                        .catch(error => console.error('Error:', error));
                    }
                });
    
                // Manejo de evento para "Eliminar"
                const btnEliminar = tr.querySelector('.btn-eliminar_paciente');
                btnEliminar.addEventListener('click', () => {
                    const numeroExpediente = btnEliminar.getAttribute('data-id');
                    if (numeroExpediente) {
                        fetch(`/boton_eliminar_paciente/${numeroExpediente}`, {
                            method: 'DELETE', // Cambié a DELETE ya que se está eliminando un recurso
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            tr.remove(); // Elimina la fila de la tabla
                        })
                        .catch(error => console.error('Error:', error));
                    } else {
                        alert('Número de expediente no válido');
                    }
                });
            });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }
    
    // Llamar a la función para actualizar la tabla al cargar la página
    document.addEventListener('DOMContentLoaded', actualizarTablaPacientes);
    




//:::::::::::::::::::::::::::::::
})