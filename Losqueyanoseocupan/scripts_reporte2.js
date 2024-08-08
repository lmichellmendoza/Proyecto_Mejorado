// Ejecuta el código cuando el contenido del documento se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el elemento de la barra lateral usando su clase
    const sidebar = document.querySelector('.sidebar');
    // Selecciona el botón para abrir la barra lateral usando su ID
    const openSidebarBtn = document.getElementById('open-sidebar');
    // Selecciona el botón para cerrar la barra lateral usando su clase
    const closeSidebarBtn = document.querySelector('.close-btn');
    // Selecciona el botón para añadir apoyo médico usando su ID
    const addSupportBtn = document.getElementById('añadir-apoyo-medico');

    // Añade un evento al botón de abrir barra lateral para mostrarla
    openSidebarBtn.addEventListener('click', () => {
        sidebar.style.left = '0'; // Mueve la barra lateral a la vista
    });

    // Añade un evento al botón de cerrar barra lateral para ocultarla
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.style.left = '-250px'; // Mueve la barra lateral fuera de la vista
    });

    // Añade un evento al botón de añadir apoyo médico
    addSupportBtn.addEventListener('click', () => {
        // Aquí iría el código para añadir apoyo médico
        // Limpia el formulario de datos después de añadir
        document.getElementById('personal-form').reset();
        alert('Apoyo médico añadido'); // Muestra un mensaje de confirmación
    });

    // Selecciona todos los botones de pestañas
    const tabButtons = document.querySelectorAll('.tab-button');
    // Selecciona todas las áreas de contenido de las pestañas
    const tabContents = document.querySelectorAll('.tab-content');

    // Añade un evento a cada botón de pestaña
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Elimina la clase 'active' de todos los botones de pestaña
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Elimina la clase 'active' de todos los contenidos de pestañas
            tabContents.forEach(content => content.classList.remove('active'));

            // Añade la clase 'active' al botón de pestaña clicado
            button.classList.add('active');
            // Muestra el contenido de pestaña correspondiente
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
    
});

// Vuelve a ejecutar el código cuando el contenido del documento se haya cargado completamente
document.addEventListener('DOMContentLoaded', function() {
    // **1. Menu (Sidebar)**
    // Obtiene el elemento del sidebar (barra lateral) usando su id.
    const sidebar = document.getElementById('sidebar');
    // Obtiene el botón para abrir el sidebar usando su id.
    const openSidebarBtn = document.getElementById('open-sidebar');
    // Obtiene el botón para cerrar el sidebar usando su clase.
    const closeSidebarBtn = document.querySelector('.close-btn');

    // **2. Tabs (Pestañas)**
    // Obtiene todos los botones de las pestañas usando su clase.
    const tabButtons = document.querySelectorAll('.tab-button');
    // Obtiene todos los contenidos de las pestañas usando su clase.
    const tabContents = document.querySelectorAll('.tab-content');

    // **3. Formulario de Datos Personales**
    // Obtiene el formulario de datos personales usando su id.
    const personalForm = document.getElementById('personal-form');

    // **4. Tabla de Datos**
    // Obtiene el cuerpo de la tabla de datos usando su id.
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // **5. Funcionalidad del Sidebar (Barra Lateral)**
    // Abre el sidebar cuando se hace clic en el botón de abrir.
    openSidebarBtn.addEventListener('click', function() {
        sidebar.style.display = 'flex'; // Muestra el sidebar.
    });

    // Cierra el sidebar cuando se hace clic en el botón de cerrar.
    closeSidebarBtn.addEventListener('click', function() {
        sidebar.style.display = 'none'; // Oculta el sidebar.
    });

    // **6. Funcionalidad de las Pestañas**
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Elimina la clase 'active' de todos los botones y contenidos de las pestañas.
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Obtiene el id del contenido que debe mostrarse para la pestaña seleccionada.
            const tab = button.getAttribute('data-tab');
            // Añade la clase 'active' al botón y al contenido de la pestaña seleccionada.
            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });

    // **7. Envío del Formulario de Datos Personales**
    personalForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página.

        // Recolecta los datos del formulario.
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellido-paterno').value;
        const apellidoMaterno = document.getElementById('apellido-materno').value;
        const genero = document.getElementById('genero').value;
        const numeroCarnet = document.getElementById('numero-carnet').value;
        const entidadFederativa = document.getElementById('entidad-federativa').value;

        // **8. Añadir Datos a la Tabla**
        // Crea una nueva fila en la tabla con los datos del formulario.
        const newRow = dataTable.insertRow();
        newRow.innerHTML = `
            <td>${numeroCarnet}</td> <!-- Número de Carnet -->
            <td>${nombre}</td> <!-- Nombre -->
            <td>${apellidoPaterno}</td> <!-- Apellido Paterno -->
            <td>${apellidoMaterno}</td> <!-- Apellido Materno -->
            <td>${genero}</td> <!-- Género -->
            <td>${entidadFederativa}</td> <!-- Entidad Federativa -->
            <td></td> <!-- Celdas vacías -->
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="delete-btn">Eliminar</button></td> <!-- Botón para eliminar fila -->
        `;

        // **9. Funcionalidad de Eliminación de Fila**
        // Añade funcionalidad al botón de eliminar en la nueva fila.
        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            dataTable.deleteRow(newRow.rowIndex - 1); // Elimina la fila de la tabla.
        });

        // Limpia el formulario después de agregar los datos a la tabla.
        personalForm.reset();

        // Muestra un mensaje que confirma que se ha agregado el apoyo médico.
        alert('Apoyo médico añadido');
    });

    // **10. Funcionalidad de Búsqueda en la Tabla**
    function searchTable() {
        // Obtiene el texto de búsqueda y los filtros seleccionados.
        const searchField = document.getElementById('search-field').value.toLowerCase();
        const fechaSolicitudFilter = document.getElementById('fecha-solicitud-filter').checked;
        const fechaResolucionFilter = document.getElementById('fecha-resolucion-filter').checked;
        const rows = dataTable.getElementsByTagName('tr');

        // Recorre cada fila de la tabla.
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let cells = row.getElementsByTagName('td');
            let showRow = false;

            // Si hay un texto de búsqueda, revisa cada celda de la fila.
            if (searchField) {
                for (let j = 0; j < cells.length; j++) {
                    // Si el texto de la celda contiene el texto de búsqueda, muestra la fila.
                    if (cells[j].textContent.toLowerCase().indexOf(searchField) > -1) {
                        showRow = true;
                        break;
                    }
                }
            } else {
                // Si no hay texto de búsqueda, muestra todas las filas.
                showRow = true;
            }

            // Aplica los filtros de fecha si están seleccionados.
            if (fechaSolicitudFilter && !cells[6].textContent) {
                showRow = false;
            }

            if (fechaResolucionFilter && !cells[7].textContent) {
                showRow = false;
            }

            // Muestra u oculta la fila dependiendo de si debe mostrarse o no.
            row.style.display = showRow ? '' : 'none';
        }
    }

    // **11. Funcionalidad para Limpiar la Búsqueda**
    function clearSearch() {
        // Limpia el campo de búsqueda y desmarca los filtros.
        document.getElementById('search-field').value = ''; // Limpia el campo de búsqueda.
        document.getElementById('fecha-solicitud-filter').checked = false; // Desmarca el filtro de fecha de solicitud.
        document.getElementById('fecha-resolucion-filter').checked = false; // Desmarca el filtro de fecha de resolución.
        searchTable(); // Vuelve a aplicar la búsqueda para mostrar todos los datos.
    }

    // **12. Asociar Funcionalidades a los Botones**
    // Asocia la función de búsqueda al botón de búsqueda.
    document.getElementById('search-button').addEventListener('click', searchTable);
    // Asocia la función de limpieza de búsqueda al botón de limpiar búsqueda.
    document.getElementById('clear-search-button').addEventListener('click', clearSearch);
});


$(document).ready(function() {
    $('#open-sidebar').click(function() {
        $('#sidebar').removeClass('closed');
    });

    $('.close-btn').click(function() {
        $('#sidebar').addClass('closed');
    });
});

