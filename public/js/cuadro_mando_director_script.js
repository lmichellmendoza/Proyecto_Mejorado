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
                            <td>
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

//::::::::::::::::::::::PARA LOS REGISTROS PACIENTES:::::::::::::::::::::::::::::::::::::::::::

document.addEventListener('DOMContentLoaded', () => {
    fetch('/registro_pacientes_director') // Llama a la ruta API que devuelve los datos de la vista
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            const tbody = document.querySelector('#rp_tabla tbody'); 

            tbody.innerHTML = ''; // Limpiar el contenido actual

            // Recorre cada médico y añade una fila a la tabla
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
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});