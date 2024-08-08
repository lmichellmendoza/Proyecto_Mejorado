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

// *************************RECETA MEDICA************************************************
//Obtener valores de medicos

// Obtener valores de médicos
$.ajax({
    url: '/receta-container',
    method: 'POST',
    success: function(doctores) {
        doctores.forEach(function(doctor) {
            const NombreCompleto = `${doctor.Nombre_Medico} ${doctor.Apellido_Paterno_Medico} ${doctor.Apellido_Materno_Medico}`;
            $("#r_menu_doctor").append(new Option(NombreCompleto, doctor.Cedula_Profesional_Medico));
        });
    },
    error: function(error) {
        console.error('Error al obtener los doctores:', error);
    }
});

// Actualizar campos al seleccionar un médico
$('#r_menu_doctor').on('change', function() {
    var selectedCedula = $(this).val();
    $.ajax({
        url: '/receta-container',
        method: 'POST',
        data: { cedula: selectedCedula },
        success: function(selectedDoctor) {
            if (selectedDoctor.length > 0) {
                var doctor = selectedDoctor[0];
                $('#r_nombre_medico').val(`${doctor.Nombre_Medico} ${doctor.Apellido_Paterno_Medico} ${doctor.Apellido_Materno_Medico}`);
                $('#r_cedula_medico').val(doctor.Cedula_Profesional_Medico);
                $('#r_especialidad_medico').val(doctor.Nombre_Especialidad_Medica);
                $('#r_egresado_medico').val(doctor.Escuela_Egresado_Medico);
            } else {
                $('#r_nombre_medico').val('');
                $('#r_cedula_medico').val('');
                $('#r_especialidad_medico').val('');
                $('#r_egresado_medico').val('');
            }
        },
        error: function(error) {
            console.error('Error al obtener los datos del médico:', error);
        }
    });
});



    // Inicializar el calendario
    var calendar_r = document.getElementById('r_calendar');
    var calendar_r = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        /*events: getSavedCitas()*/ // Cargar eventos guardados en el calendario
    });
    calendar_r.render();
$('#r_boton_fecha').on('click', function() {
    $('calendar_r').toggle();
});

/*$('#r_calendar').datepicker({
    dateFormat: 'dd   /   mm   / yy',
    onSelect: function(dateText) {
        $('#r_fecha').text(dateText);
        $('#r_calendar').hide();
    }
});*/






$('#r_boton_pdf').on('click', function() {
    var r_nombre_paciente = $('#r_nombre_paciente').val();
    var r_expediente_paciente = $('#r_numero_expediente_paciente').val();
    var r_edad_paciente = $('#r_edad_paciente').val();
    var r_peso_paciente = $('#r_peso_paciente').val();
    var r_diag_paciente = $('#r_diag_paciente').val();
    var r_fec_nac_paciente = $('#r_nacimiento_paciente').val();
    var r_domicilio_paciente = $('#r_domicilio_paciente').val();
    var r_fecha_seleccionada = $('#r_fecha').text();
    var r_nombre_medico = $('#r_nombre_medico').val();
    var r_cedula = $('#r_cedula_medico').val();
    var r_especialidad = $('#r_especialidad_medico').val();
    var r_egresado = $('#r_egresado_medico').val();
    var r_especificaciones = $('#r_especificaciones').val();

    if (!r_nombre_paciente || !r_expediente_paciente) {
        alert('Por favor, ingrese el nombre y el expediente del paciente.');
        return;
    }

    var qrText = `${r_fecha_seleccionada}\n${r_nombre_paciente} ${r_expediente_paciente}\n${r_edad_paciente} ${r_peso_paciente} ${r_diag_paciente}\n${r_fec_nac_paciente} ${r_domicilio_paciente}\n${r_especificaciones}\n${r_nombre_medico}\n${r_cedula}\n${r_especialidad}     ${r_egresado}`;

    var qrContainer = document.createElement('div');
    var qrcode = new QRCode(qrContainer, {
        text: qrText,
        width: 100,
        height: 100,
    });

    setTimeout(function() {
        var qrImg = qrContainer.querySelector('img').src;

        var { jsPDF } = window.jspdf;
        var doc = new jsPDF('p', 'mm', 'a4');
        var img = new Image();
        img.src = 'public/images/receta_comprimida.png';

        img.onload = function() {
            var imgWidth = 210; 
            var imgHeight = (imgWidth * 600) / 1000; 

            doc.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
            doc.setFontSize(10);
            doc.text(fecha_seleccionada, 168, 18);
            doc.text(nombre_paciente, 45, 30); 
            doc.text(expediente_paciente, 150, 31); 
            doc.text(edad_paciente, 24, 36); 
            doc.text(peso_paciente, 80, 37); 
            doc.text(diag_paciente, 125, 37); 
            doc.text(fec_nac_paciente, 45, 43); 
            doc.text(domicilio_paciente, 98, 44); 
            doc.text(especificaciones, 10, 60); 
            doc.text(nombre_medico, 33, 105); 
            doc.text(cedula, 33, 108); 
            doc.text(especialidad, 33, 111); 
            doc.text(egresado, 33, 114); 

            var qrX = (imgWidth - 20) / 2; 
            var qrY = imgHeight / 2 + 135; 
            doc.addImage(qrImg, 'PNG', qrX, qrY, 70, 70); 

            var nombreArchivo = `${nombre_paciente}_${expediente_paciente}.pdf`;
            doc.save(nombreArchivo);
        };
    }, 1000); 
});

document.getElementById('logout-button').addEventListener('click', function() {
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login_medico'; // Redirigir al usuario a la página de inicio de sesión.
            } else {
                alert('Error al cerrar sesión. Inténtalo de nuevo.');
            }
        })
        .catch(error => console.error('Error:', error));
});