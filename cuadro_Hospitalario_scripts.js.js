// **Encabezado**
// Aquí están los elementos y estructuras del encabezado, como los botones, los títulos, y las secciones principales.

// **Función para mostrar el mensaje de bienvenida**
function mostrarMensajeBienvenida() {
    // Esta función se encarga de mostrar un mensaje de bienvenida cuando se carga la página o se selecciona la pestaña de bienvenida.
    document.querySelector('.form-container').innerHTML = '<h2 id="mensaje-bienvenida">¡Bienvenido!</h2>';
}

// **Funcionalidad de las Pestañas (Tabs)**
function cargarContenidoPestana(idPestana) {
    // Esta función gestiona la lógica para mostrar el contenido correcto cuando se selecciona una pestaña.
    
    // Desactiva todas las pestañas
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));

    // Oculta todos los contenidos de las pestañas
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    // Activa la pestaña seleccionada
    document.querySelector('[data-tab="' + idPestana + '"]').classList.add('active');

    var mensaje;
    switch (idPestana) {
        case 'personal':
            // Muestra el contenido de "Datos Personales"
            document.getElementById('personal').style.display = 'block';
            return;
        case 'externo':
            // Carga el contenido del archivo externo (ayudas_externas.html)
            fetch('ayudas_externas.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar el contenido');
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById('externo').innerHTML = html;
                    document.getElementById('externo').style.display = 'block';
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                    document.getElementById('externo').innerHTML = '<p>Error al cargar el contenido.</p>';
                    document.getElementById('externo').style.display = 'block';
                });
            return;
        case 'sin-presupuesto':
            mensaje = 'Contenido de Ayudas Externas sin Presupuesto';
            break;
        case 'anual':
            mensaje = 'Contenido de Plan Anual';
            break;
        case 'derivaciones':
            mensaje = 'Contenido de Derivaciones';
            break;
        case 'traslados':
            mensaje = 'Contenido de Traslados';
            break;
        case 'incidentes':
            mensaje = 'Contenido de Incidentes Críticos';
            break;
        default:
            mensaje = 'Contenido no disponible';
            break;
    }

    // Muestra el mensaje en el contenedor si no se está cargando contenido dinámico
    if (mensaje) {
        document.querySelector('.form-container').innerHTML = '<p>' + mensaje + '</p>';
    }
}

// **Funcionalidad del Menú Lateral (Sidebar)**
document.getElementById('open-sidebar').addEventListener('click', function() {
    // Abre el menú lateral (sidebar)
    document.getElementById('sidebar').style.left = '0';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    // Cierra el menú lateral
    document.getElementById('sidebar').style.left = '-250px';
});

document.getElementById('sidebar').addEventListener('mouseleave', function() {
    // Cierra el menú lateral cuando el cursor sale del área
    document.getElementById('sidebar').style.left = '-250px';
});

document.getElementById('sidebar').addEventListener('mouseenter', function() {
    // Cancela el temporizador para evitar que el menú se cierre si el usuario vuelve a ingresar al área
    clearTimeout(this.dataset.timeoutId);
});

document.getElementById('sidebar').addEventListener('mouseleave', function() {
    // Configura un temporizador para cerrar el menú automáticamente después de 1 segundo
    var timeoutId = setTimeout(() => {
        document.getElementById('sidebar').style.left = '-250px';
    }, 1000);
    this.dataset.timeoutId = timeoutId;
});

// **Inicialización del documento cuando está listo**
document.addEventListener('DOMContentLoaded', function() {
    // Manejo del clic en las pestañas
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            var idPestana = this.dataset.tab;
            if (idPestana === 'bienvenida') {
                mostrarMensajeBienvenida();
            } else {
                cargarContenidoPestana(idPestana);
            }
        });
    });

    // Mostrar mensaje de bienvenida al iniciar
    mostrarMensajeBienvenida();
});

// **Funcionalidad del formulario de Datos Personales**
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene una referencia al formulario
    const form = document.getElementById('form-datos-personales');
    // Obtiene una referencia al cuerpo de la tabla donde se agregarán los datos
    const tabla = document.getElementById('datos-personales-tabla').getElementsByTagName('tbody')[0];
    // Obtiene una referencia al elemento que mostrará el mensaje de éxito
    const mensajeExito = document.getElementById('mensaje-exito');
    // Obtiene referencias a los elementos relacionados con el formulario
    const tipoApoyo = document.getElementById('tipo-apoyo');
    const especificarOtrosContainer = document.getElementById('especificar-otros-container');
    const especificarOtros = document.getElementById('especificar-otros');

    // Añade un listener al evento de envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario recargue la página

        // Obtiene los datos del formulario
        const numeroCarnet = document.getElementById('numero-carnet').value;
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellido-paterno').value;
        const apellidoMaterno = document.getElementById('apellido-materno').value;
        const edad = document.getElementById('edad').value;
        const sexo = document.getElementById('sexo').value;
        const entidadFederativa = document.getElementById('entidad-federativa').value;
        const tipoApoyoTexto = tipoApoyo.value === 'otros' ? especificarOtros.value : tipoApoyo.options[tipoApoyo.selectedIndex].text;
        const tipoApoyoEspecificacion = tipoApoyo.value === 'otros' ? especificarOtros.value : '';
        const fechaSolicitud = document.getElementById('fecha-solicitud').value;
        const fechaResolucion = document.getElementById('fecha-resolucion').value;
        const montoApoyo = document.getElementById('monto-apoyo').value;

        // Crea una nueva fila en la tabla con los datos ingresados
        const newRow = tabla.insertRow();
        newRow.insertCell().textContent = numeroCarnet;
        newRow.insertCell().textContent = nombre;
        newRow.insertCell().textContent = apellidoPaterno;
        newRow.insertCell().textContent = apellidoMaterno;
        newRow.insertCell().textContent = edad;
        newRow.insertCell().textContent = sexo;
        newRow.insertCell().textContent = entidadFederativa;
        newRow.insertCell().textContent = tipoApoyo.value === 'otros' ? especificarOtros.value : tipoApoyo.options[tipoApoyo.selectedIndex].text;
        newRow.insertCell().textContent = montoApoyo;
        newRow.insertCell().textContent = tipoApoyoEspecificacion ? tipoApoyoEspecificacion : '';
        newRow.insertCell().textContent = fechaSolicitud;
        newRow.insertCell().textContent = fechaResolucion;

        // Muestra un mensaje de éxito por 3 segundos
        mensajeExito.style.display = 'block';
        setTimeout(() => mensajeExito.style.display = 'none', 3000);

        // Limpia los campos del formulario
        form.reset();
        especificarOtrosContainer.style.display = 'none'; // Asegura que el campo "Especifique" esté oculto después de enviar el formulario
    });

    // Añade un listener al cambio del desplegable de tipo de apoyo
    tipoApoyo.addEventListener('change', function() {
        if (this.value === 'otros') {
            especificarOtrosContainer.style.display = 'block';
            especificarOtros.required = true; // Hace que el campo sea obligatorio si se selecciona "Otros"
        } else {
            especificarOtrosContainer.style.display = 'none';
            especificarOtros.required = false; // Elimina la obligatoriedad si se selecciona otra opción
            especificarOtros.value = ''; // Limpia el campo si estaba previamente visible
        }
    });

    // Asegura que el campo "Especifique" esté oculto al cargar la página
    if (tipoApoyo.value !== 'otros') {
        especificarOtrosContainer.style.display = 'none';
        especificarOtros.required = false;
    }

    $('#btn-exportar-pdf').click(function() {
        exportarPDF();
    });
});

// **Funcionalidad del Buscador de Datos Personales**
document.addEventListener('DOMContentLoaded', function() {
    const criterioBusqueda = document.getElementById('criterio-busqueda');
    const buscarMes = document.getElementById('buscar-mes');
    const buscarAnio = document.getElementById('buscar-anio');
    const buscarCarnet = document.getElementById('buscar-carnet');
    const buscarNombre = document.getElementById('buscar-nombre');
    const limpiarBusqueda = document.getElementById('limpiar-busqueda');
    const tabla = document.getElementById('datos-personales-tabla');
    const tbody = tabla.querySelector('tbody');

    // Función para mostrar el campo de búsqueda seleccionado
    function actualizarCamposBusqueda() {
        const criterio = criterioBusqueda.value;

        document.querySelectorAll('#buscador div').forEach(div => div.classList.remove('active'));

        if (criterio === 'mes') {
            document.getElementById('buscar-mes-container').classList.add('active');
        } else if (criterio === 'anio') {
            document.getElementById('buscar-anio-container').classList.add('active');
        } else if (criterio === 'carnet') {
            document.getElementById('buscar-carnet-container').classList.add('active');
        } else if (criterio === 'nombre') {
            document.getElementById('buscar-nombre-container').classList.add('active');
        }
    }

    actualizarCamposBusqueda();

    criterioBusqueda.addEventListener('change', actualizarCamposBusqueda);

    function buscar() {
        const mesBusqueda = buscarMes.value;
        const anioBusqueda = buscarAnio.value;
        const carnetBusqueda = buscarCarnet.value.toLowerCase();
        const nombreBusqueda = buscarNombre.value.toLowerCase();

        const filas = tbody.getElementsByTagName('tr');

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            let coincidencia = true;

            // Buscar por mes en la fecha de solicitud
            if (mesBusqueda) {
                const fechaSolicitud = new Date(celdas[10].textContent); // Asegúrate que el índice 10 es el correcto
                coincidencia = coincidencia && (fechaSolicitud.getMonth() + 1) === parseInt(mesBusqueda);
            }

            // Buscar por año en la fecha de solicitud
            if (anioBusqueda) {
                const fechaSolicitud = new Date(celdas[10].textContent); // Asegúrate que el índice 10 es el correcto
                coincidencia = coincidencia && fechaSolicitud.getFullYear() === parseInt(anioBusqueda);
            }

            if (carnetBusqueda) {
                coincidencia = coincidencia && celdas[0].textContent.toLowerCase().includes(carnetBusqueda);
            }

            if (nombreBusqueda) {
                coincidencia = coincidencia && celdas[1].textContent.toLowerCase().includes(nombreBusqueda);
            }

            filas[i].style.display = coincidencia ? '' : 'none';
        }
    }

    // Función para generar un archivo CSV con los datos visibles de la tabla
    function generarReporte() {
        // Obtener todas las filas (<tr>) del cuerpo de la tabla (tbody) y convertirlas en un array
        const rows = Array.from(tbody.getElementsByTagName('tr'));
        // Crear un array vacío donde se almacenarán los datos que irán en el CSV
        let reporteDatos = [];

        // Iterar sobre cada fila de la tabla
        rows.forEach(row => {
            // Verificar si la fila está visible (si no tiene 'display: none')
            if (row.style.display !== 'none') {
                // Obtener todas las celdas (<td>) de la fila y convertirlas en un array
                // Luego, mapear su contenido de texto y asegurarse de que las comillas dentro del texto sean dobles ("") 
                // para que no causen problemas en el formato CSV
                const cells = Array.from(row.getElementsByTagName('td')).map(cell => `"${cell.textContent.replace(/"/g, '""')}"`);
                reporteDatos.push(cells);
            }
        });
    
        if (reporteDatos.length === 0) {
            alert('No hay datos para generar el reporte.');
            return;
        }
    
        const csvContent = "data:text/csv;charset=utf-8,"
            + reporteDatos.map(e => e.join(",")).join("\n");
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reporte.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
        
    document.getElementById('btn-generar-csv').addEventListener('click', generarReporte);

    document.getElementById('buscar-datos').addEventListener('click', buscar);
    document.getElementById('limpiar-busqueda').addEventListener('click', function() {
        const filas = tbody.getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            filas[i].style.display = '';
        }

        buscarMes.value = '';
        buscarAnio.value = '';
        buscarCarnet.value = '';
        buscarNombre.value = '';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let presupuestoInicial = 0;
    let presupuestoEjercer = 0;

    const valorPresupuestoInicial = document.getElementById('valor-presupuesto-inicial');
    const inputPresupuestoInicial = document.getElementById('input-presupuesto-inicial');
    const establecerPresupuestoBtn = document.getElementById('establecer-presupuesto');
    const valorCostoApoyo = document.getElementById('valor-costo-apoyo');
    const fechaCostoApoyo = document.getElementById('fecha-costo-apoyo');
    const valorPresupuestoEjercer = document.getElementById('valor-presupuesto-ejercer');
    const valorUltimoApoyo = document.getElementById('valor-ultimo-apoyo');
    const fechaUltimoApoyo = document.getElementById('fecha-ultimo-apoyo');

    // Establecer Presupuesto Inicial
    establecerPresupuestoBtn.addEventListener('click', function() {
        presupuestoInicial = parseFloat(inputPresupuestoInicial.value) || 0;
        presupuestoEjercer = presupuestoInicial;
        valorPresupuestoInicial.textContent = `$${presupuestoInicial.toFixed(2)}`;
        valorPresupuestoEjercer.textContent = `$${presupuestoEjercer.toFixed(2)}`;
        inputPresupuestoInicial.value = '';
    });

    // Actualizar Presupuesto a Ejercer al ingresar un nuevo monto de apoyo
    const form = document.getElementById('form-datos-personales');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const montoApoyo = parseFloat(document.getElementById('monto-apoyo').value) || 0;

        // Actualizar el Costo de Apoyo Ingresado
        const fechaActual = new Date();
        const fechaString = fechaActual.toLocaleDateString() + ' ' + fechaActual.toLocaleTimeString();
        valorCostoApoyo.textContent = `$${montoApoyo.toFixed(2)}`;
        fechaCostoApoyo.textContent = fechaString;

        // Actualizar el Último Apoyo Ingresado
        valorUltimoApoyo.textContent = `$${montoApoyo.toFixed(2)}`;
        fechaUltimoApoyo.textContent = fechaString;

        // Calcular el nuevo presupuesto a ejercer
        presupuestoEjercer -= montoApoyo;
        valorPresupuestoEjercer.textContent = `$${presupuestoEjercer.toFixed(2)}`;

        // Alerta si el presupuesto a ejercer es bajo
        if (presupuestoEjercer <= 0) {
            alert('¡Presupuesto agotado!');
        } else if (presupuestoEjercer < presupuestoInicial * 0.1) {
            alert('Advertencia: El presupuesto está a punto de agotarse.');
        }

        // Proceder a agregar los datos a la tabla
        const tabla = document.getElementById('datos-personales-tabla').getElementsByTagName('tbody')[0];
        const numeroCarnet = document.getElementById('numero-carnet').value;
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellido-paterno').value;
        const apellidoMaterno = document.getElementById('apellido-materno').value;
        const edad = document.getElementById('edad').value;
        const sexo = document.getElementById('sexo').value;
        const entidadFederativa = document.getElementById('entidad-federativa').value;
        const tipoApoyo = document.getElementById('tipo-apoyo').value;
        const especificarOtros = document.getElementById('especificar-otros').value;
        const fechaSolicitud = document.getElementById('fecha-solicitud').value;
        const fechaResolucion = document.getElementById('fecha-resolucion').value;

        const newRow = tabla.insertRow();
        newRow.insertCell().textContent = numeroCarnet;
        newRow.insertCell().textContent = nombre;
        newRow.insertCell().textContent = apellidoPaterno;
        newRow.insertCell().textContent = apellidoMaterno;
        newRow.insertCell().textContent = edad;
        newRow.insertCell().textContent = sexo;
        newRow.insertCell().textContent = entidadFederativa;
        newRow.insertCell().textContent = tipoApoyo === 'otros' ? especificarOtros : tipoApoyo;
        newRow.insertCell().textContent = `$${montoApoyo.toFixed(2)}`; // Formato de monto en la tabla
        newRow.insertCell().textContent = tipoApoyo === 'otros' ? especificarOtros : '';
        newRow.insertCell().textContent = fechaSolicitud;
        newRow.insertCell().textContent = fechaResolucion;

        form.reset();
    });
});
