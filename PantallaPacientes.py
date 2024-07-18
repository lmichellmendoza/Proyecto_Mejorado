from flask import Flask, request, jsonify, send_file
from fpdf import FPDF
import os

app = Flask(__name__)

data = [
    {'id': '1', 'nombre': 'Juan', 'apellido': 'Perez', 'edad': '30', 'num_req': '123456', 'articulo': 'Muletas', 'costo': '$50', 'estado_pago': 'Pendiente', 'num_factura': '3333', 'proveedor': 'Muletas S.A. de C.V.', 'folio_pago': '1111'},
    {'id': '2', 'nombre': 'Maria', 'apellido': 'Garcia', 'edad': '25', 'num_req': '654321', 'articulo': 'Silla de ruedas', 'costo': '$100', 'estado_pago': 'Pagado', 'num_factura': '2222', 'proveedor': 'Sillas S.A. de C.V.', 'folio_pago': '9898'},
]

@app.route('/patients', methods=['GET', 'POST'])
def patients():
    if request.method == 'GET':
        return jsonify(data)
    elif request.method == 'POST':
        new_patient = request.json
        data.append(new_patient)
        return jsonify({'success': True})

@app.route('/patients/<id>', methods=['GET'])
def get_patient(id):
    patient = next((p for p in data if p['id'] == id), None)
    return jsonify(patient) if patient else ('', 404)

@app.route('/patients/<id>/pdf', methods=['GET'])
def generate_pdf(id):
    patient = next((p for p in data if p['id'] == id), None)
    if not patient:
        return '', 404

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for key, value in patient.items():
        pdf.cell(200, 10, txt=f"{key}: {value}", ln=True)
    pdf_output = f"paciente_{id}.pdf"
    pdf.output(pdf_output)
    
    return send_file(pdf_output, as_attachment=True, attachment_filename=pdf_output)

if __name__ == '__main__':
    app.run(debug=True)
