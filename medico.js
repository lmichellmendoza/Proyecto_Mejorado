let medicos = [];
let medicoSeleccionado = null;

document.addEventListener('DOMContentLoaded', fetchEspecialidades);

function fetchEspecialidades() {
    const selectEspecialidad = document.getElementById('especialidad');
    selectEspecialidad.innerHTML = ''; // Limpia las opciones actuales para evitar duplicados

    fetch('http://localhost:3003/especialidades')
        .then(response => response.json())
        .then(especialidades => {
            especialidades.forEach(especialidad => {
                const option = document.createElement('option');
                option.value = especialidad.nombre_especialidad_medica;
                option.textContent = especialidad.nombre_especialidad_medica;
                selectEspecialidad.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener las especialidades:', error);
            alert('Error al conectar con el servidor');
        });
}

function guardarMedico() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const especialidad = document.getElementById('especialidad').value;
    const escuela = document.getElementById('escuela').value;

    if (nombre && cedula && especialidad && escuela) {
        const medico = { nombre, cedula, especialidad, escuela };
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
        medicos[medicoSeleccionado].nombre = document.getElementById('nombre').value;
        medicos[medicoSeleccionado].cedula = document.getElementById('cedula').value;
        medicos[medicoSeleccionado].especialidad = document.getElementById('especialidad').value;
        medicos[medicoSeleccionado].escuela = document.getElementById('escuela').value;

        actualizarTabla();
        limpiarCampos();
        medicoSeleccionado = null;
        alert('Médico modificado con éxito');
    } else {
        alert('Selecciona un médico para modificar');
    }
}

function eliminarMedico() {
    if (medicoSeleccionado !== null) {
        medicos.splice(medicoSeleccionado, 1);
        actualizarTabla();
        limpiarCampos();
        medicoSeleccionado = null;
        alert('Médico eliminado con éxito');
    } else {
        alert('Selecciona un médico para eliminar');
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('medicoTableBody');
    tbody.innerHTML = '';
    medicos.forEach((medico, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medico.nombre}</td>
            <td>${medico.cedula}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.escuela}</td>
        `;
        row.onclick = () => seleccionarMedico(index);
        tbody.appendChild(row);
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('especialidad').value = '';
    document.getElementById('escuela').value = '';
}

function seleccionarMedico(index) {
    const medico = medicos[index];
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('cedula').value = medico.cedula;
    document.getElementById('especialidad').value = medico.especialidad;
    document.getElementById('escuela').value = medico.escuela;
    medicoSeleccionado = index;
}

function mostrarModalEspecialidad() {
    document.getElementById('modalEspecialidad').style.display = 'block';
}

function cerrarModalEspecialidad() {
    document.getElementById('modalEspecialidad').style.display = 'none';
}

function guardarEspecialidad() {
    const nombreEspecialidad = document.getElementById('nuevaEspecialidad').value.trim();

    if (nombreEspecialidad) {
        fetch('http://localhost:3003/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreEspecialidad })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje);
            fetchEspecialidades(); // Actualiza el select con la nueva especialidad sin duplicados
            cerrarModalEspecialidad();
            document.getElementById('nuevaEspecialidad').value = '';
        })
        .catch(error => {
            console.error('Error al guardar la especialidad:', error);
            alert('Error al conectar con el servidor');
        });
    } else {
        alert('Por favor, ingresa el nombre de la especialidad');
    }
}
