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
                    profilePicture: 'images/Profile-Avatar-PNG.png'
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

    // Obtener la lista de médicos desde el servidor
    $.ajax({
        url: 'receta-container',
        method: 'GET',
        success: function(data) {
            var doctores = data;

            doctores.forEach(function(doctor) {
                $('#r_menu_doctor').append(new Option(doctor.nombre, doctor.nombre));
            });

            $('#r_menu_doctor').on('change', function() {
                var selectedDoctor = doctores.find(doc => doc.nombre === this.value);
                if (selectedDoctor) {
                    $('#r_nombre_medico').val(selectedDoctor.nombre);
                    $('#r_cedula_medico').val(selectedDoctor.cedula);
                    $('#r_especialidad_medico').val(selectedDoctor.especialidad);
                    $('#r_egresado_medico').val(selectedDoctor.egresado);
                } else {
                    $('#r_nombre_medico').val('');
                    $('#r_cedula_medico').val('');
                    $('#r_especialidad_medico').val('');
                    $('#r_egresado_medico').val('');
                }
            });
        },
        error: function(error) {
            console.error('Error al obtener la lista de médicos:', error);
        }
    });

    // Manejador para el calendario
    $('#r_boton_fecha').on('click', function() {
        $('#r_calendar').toggle();
    });

    $('#r_calendar').datepicker({
        dateFormat: 'dd / mm / yy',
        onSelect: function(dateText) {
            $('#r_fecha').text(dateText);
            $('#r_calendar').hide();
        }
    });

    // Manejador para generar el PDF
    $('#r_boton_pdf').on('click', function() {
        var nombre_paciente = $('#nombre_paciente').val();
        var expediente_paciente = $('#expediente_paciente').val();
        var edad_paciente = $('#edad_paciente').val();
        var peso_paciente = $('#peso_paciente').val();
        var diag_paciente = $('#diag_paciente').val();
        var fec_nac_paciente = $('#fec_nac_paciente').val();
        var domicilio_paciente = $('#domicilio_paciente').val();
        var fecha_seleccionada = $('#fecha').text();
        var nombre_medico = $('#nombre_medico').val();
        var cedula = $('#cedula_medico').val();
        var especialidad = $('#especialidad_medico').val();
        var egresado = $('#egresado_medico').val();
        var especificaciones = $('#especificaciones').val();

        if (!nombre_paciente || !expediente_paciente) {
            alert('Por favor, ingrese el nombre y el expediente del paciente.');
            return;
        }

        var qrText = `${fecha_seleccionada}\n${nombre_paciente} ${expediente_paciente}\n${edad_paciente} ${peso_paciente} ${diag_paciente}\n${fec_nac_paciente} ${domicilio_paciente}\n${especificaciones}\n${nombre_medico}\n${cedula}\n${especialidad} ${egresado}`;

        var qrContainer = document.createElement('div');
        var qrcode = new QRCode(qrContainer, {
            text: qrText,
            width: 100,
            height: 100,
            correctLevel: QRCode.CorrectLevel.H,
            utf8: true // Añade soporte para UTF-8
        });

        setTimeout(function() {
            var qrImg = qrContainer.querySelector('img').src;

            var { jsPDF } = window.jspdf;
            var doc = new jsPDF('p', 'mm', 'a4');
            var img = new Image();
            img.src = 'Receta.png';

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


//Obtener los valores de los pacientes

/*document.getElementById('traer_pacientes').addEventListener('click', function(event){
    event.preventDefault();
    const numeroExpediente= document.getElementById('r_numero_expediente_paciente').value;

    fetch('/buscar_paciente',{ //Asi se llama en mi back
        method:'POST',
        headers:{
            'Content-Type':'applocation/json'

        },
        body:JSON.stringify({numeroExpediente})
    })
    .then(response=>response.json())
    .then(data=>{
        if (data){
            document.getElementById('r_nombre_paciente').value = data.nombre_completo;
            document.getElementById('r_nacimiento_paciente').value = data.fecha_nacimiento;
        }
        else
        {
            alert('Paciente no encontrado');
        }
    })
    .catch(error=>{
        console.error('Error:', error);
        alert('Error al buscar paciente');
    });
});*/