$(document).ready(function() {
    // Obtener la lista de médicos desde el servidor
    $.ajax({
        url: 'http://localhost:3000/medicos',
        method: 'GET',
        success: function(data) {
            var doctores = data;

            doctores.forEach(function(doctor) {
                $('#doctor_menu').append(new Option(doctor.nombre, doctor.nombre));
            });

            $('#doctor_menu').on('change', function() {
                var selectedDoctor = doctores.find(doc => doc.nombre === this.value);
                if (selectedDoctor) {
                    $('#nombre_medico').val(selectedDoctor.nombre);
                    $('#cedula_medico').val(selectedDoctor.cedula);
                    $('#especialidad_medico').val(selectedDoctor.especialidad);
                    $('#egresado_medico').val(selectedDoctor.egresado);
                } else {
                    $('#nombre_medico').val('');
                    $('#cedula_medico').val('');
                    $('#especialidad_medico').val('');
                    $('#egresado_medico').val('');
                }
            });
        },
        error: function(error) {
            console.error('Error al obtener la lista de médicos:', error);
        }
    });

    // Manejador para el calendario
    $('#boton_fecha').on('click', function() {
        $('#calendar').toggle();
    });

    $('#calendar').datepicker({
        dateFormat: 'dd / mm / yy',
        onSelect: function(dateText) {
            $('#fecha').text(dateText);
            $('#calendar').hide();
        }
    });

    // Manejador para generar el PDF
    $('#boton_pdf').on('click', function() {
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
});
