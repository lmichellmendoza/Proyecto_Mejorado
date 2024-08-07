let medicos = [];
let medicoSeleccionado = null;

function guardarMedico() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const especialidad = document.getElementById('especialidad').value;

    if (nombre && cedula && especialidad) {
        const medico = { nombre, cedula, especialidad };
        medicos.push(medico);
        actualizarTabla();
        limpiarCampos();
        alert('Médico registrado con éxito');
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function modificarMedico() {
    if (medicoSeleccionado !== null) {
        const nombre = document.getElementById('nombre').value;
        const cedula = document.getElementById('cedula').value;
        const especialidad = document.getElementById('especialidad').value;

        medicos[medicoSeleccionado] = { nombre, cedula, especialidad };
        actualizarTabla();
        limpiarCampos();
        alert('Médico modificado con éxito');
        medicoSeleccionado = null;
    } else {
        alert('Seleccione un médico para modificar');
    }
}

function eliminarMedico() {
    if (medicoSeleccionado !== null) {
        medicos.splice(medicoSeleccionado, 1);
        actualizarTabla();
        limpiarCampos();
        alert('Médico eliminado con éxito');
        medicoSeleccionado = null;
    } else {
        alert('Seleccione un médico para eliminar');
    }
}

function seleccionarMedico(index) {
    medicoSeleccionado = index;
    const medico = medicos[index];
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('cedula').value = medico.cedula;
    document.getElementById('especialidad').value = medico.especialidad;
}

function actualizarTabla() {
    const tableBody = document.getElementById('medicoTableBody');
    tableBody.innerHTML = '';
    medicos.forEach((medico, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medico.nombre}</td>
            <td>${medico.cedula}</td>
            <td>${medico.especialidad}</td>
        `;
        row.onclick = () => seleccionarMedico(index);
        tableBody.appendChild(row);
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('especialidad').value = '';
}
