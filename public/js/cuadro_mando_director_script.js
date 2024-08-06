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
