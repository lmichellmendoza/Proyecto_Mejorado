document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patientForm');
    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addPatient();
    });
    fetchPatients();
});

function fetchPatients() {
    fetch('/patients')
        .then(response => response.json())
        .then(data => populateTable(data));
}

function addPatient() {
    const formData = new FormData(document.getElementById('patientForm'));
    const patientData = Object.fromEntries(formData.entries());
    fetch('/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Paciente agregado exitosamente.');
            fetchPatients();
            clearForm();
        } else {
            alert('Error al agregar paciente.');
        }
    });
}

function clearForm() {
    document.getElementById('patientForm').reset();
}

function populateTable(patients) {
    const tbody = document.getElementById('patientsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    patients.forEach(patient => {
        const row = tbody.insertRow();
        for (let key in patient) {
            const cell = row.insertCell();
            cell.textContent = patient[key];
        }
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button onclick="viewPatient('${patient.id}')">Ver</button>
            <button onclick="editPatient('${patient.id}')">Editar</button>
            <button onclick="generatePDF('${patient.id}')">Generar PDF</button>
        `;
    });
}

function searchPatient() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('/patients')
        .then(response => response.json())
        .then(data => {
            const filteredPatients = data.filter(patient => patient.nombre.toLowerCase().includes(searchInput) || patient.id.toLowerCase().includes(searchInput));
            populateTable(filteredPatients);
        });
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    fetchPatients();
}

function viewPatient(id) {
    fetch(`/patients/${id}`)
        .then(response => response.json())
        .then(data => {
            alert(JSON.stringify(data, null, 2));
        });
}

function editPatient(id) {
    // Logica para editar el paciente
}

function generatePDF(id) {
    fetch(`/patients/${id}/pdf`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `paciente_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
}
