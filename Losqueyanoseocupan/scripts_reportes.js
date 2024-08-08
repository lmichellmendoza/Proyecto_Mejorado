document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('support-form');
    const tableBody = document.getElementById('registro-table-body');
    const addButton = document.getElementById('añadir-apoyo-medico');

    addButton.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Obtener los valores del formulario
        const numeroCarnet = document.getElementById('numero-carnet').value;
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellido-paterno').value;
        const apellidoMaterno = document.getElementById('apellido-materno').value;
        const edad = document.getElementById('edad').value;
        const descripcionApoyo = document.getElementById('descripcion-apoyo').value;
        const montoEconomico = document.getElementById('monto-economico').value;
        const entidadFederativa = document.getElementById('entidad-federativa').value;
        const fechaSolicitud = document.getElementById('fecha-solicitud-apoyo').value;
        const fechaResolucion = document.getElementById('fecha-resolucion-apoyo').value;
        const tipoApoyo = document.getElementById('tipo-apoyo').value;

        // Crear una nueva fila en la tabla con los datos del formulario
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${numeroCarnet}</td>
            <td>${nombre}</td>
            <td>${apellidoMaterno}</td>
            <td>${apellidoPaterno}</td>
            <td>F</td>
            <td>${edad}</td>
            <td>${tipoApoyo}</td>
            <td>${descripcionApoyo}</td>
            <td>${montoEconomico}</td>
            <td>${fechaSolicitud}</td>
            <td>${fechaResolucion}</td>
        `;

        // Agregar la nueva fila a la tabla
        tableBody.appendChild(newRow);

        // Limpiar los campos del formulario después de agregar el registro
        form.reset();
    });
});

document.getElementById("save-presupuestos").addEventListener("click", () => {
    const presupuestoDosMesesAnteriores = document.getElementById("presupuesto-dos-meses-anteriores").innerText;
    const presupuestoMensualAnterior = document.getElementById("presupuesto-mensual-anterior").innerText;
    const presupuestoMensualActual = document.getElementById("presupuesto-mensual-actual").innerText;
    
    // Aquí se guardarían los valores en el almacenamiento local o en una base de datos
    console.log("Presupuesto Dos Meses Anteriores:", presupuestoDosMesesAnteriores);
    console.log("Presupuesto Mensual Anterior:", presupuestoMensualAnterior);
    console.log("Presupuesto Mensual Actual:", presupuestoMensualActual);
    
    alert("Presupuestos guardados correctamente");
});

document.getElementById('modificar-presupuestos').addEventListener('click', function() {
    const presupuestos = [
        'presupuesto-dos-meses-anteriores',
        'presupuesto-mensual-anterior',
        'presupuesto-mensual-actual'
    ];

    presupuestos.forEach(id => {
        const elemento = document.getElementById(id);
        elemento.contentEditable = elemento.isContentEditable ? "false" : "true";
        elemento.style.backgroundColor = elemento.isContentEditable ? "#ffffff" : "#e9f1f7";
    });
});

document.getElementById('añadir-apoyo-medico').addEventListener('click', function() {
    const carnet = document.getElementById('numero-carnet').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellido-paterno').value;
    const apellidoMaterno = document.getElementById('apellido-materno').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const edad = document.getElementById('edad').value;
    const tipoApoyo = document.getElementById('tipo-apoyo').value;
    const descripcionApoyo = document.getElementById('descripcion-apoyo').value;
    const montoEconomico = document.getElementById('monto-economico').value;
    const fechaSolicitud = document.getElementById('fecha-solicitud-apoyo').value;
    const fechaResolucion = document.getElementById('fecha-resolucion-apoyo').value;

    const tableBody = document.getElementById('registro-table-body');
    const row = document.createElement('tr');

    const cells = [carnet, nombre, apellidoPaterno, apellidoMaterno, sexo, edad, tipoApoyo, descripcionApoyo, montoEconomico, fechaSolicitud, fechaResolucion];

    cells.forEach(cellText => {
        const cell = document.createElement('td');
        cell.textContent = cellText;
        row.appendChild(cell);
    });

    tableBody.appendChild(row);

    document.getElementById('support-form').reset();
});


document.getElementById("search").addEventListener("keyup", (e) => {
    const searchText = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#registro-table-body tr");
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        let match = false;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.toLowerCase().indexOf(searchText) > -1) {
                match = true;
                break;
            }
        }
        row.style.display = match ? "" : "none";
    });
});

// JavaScript para manejar la interacción del formulario y la tabla
