from flask import Flask, request, jsonify
from ConexionBD import ConexionBD

app = Flask(__name__)

# Ruta para el login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    conexion_bd = ConexionBD()
    conexion_bd.conectar()
    conexion = conexion_bd.obtener_conexion()

    if conexion:
        cursor = conexion.cursor()
        query = 'SELECT * FROM usuario WHERE username = %s AND ContraseñaUsuario = %s'
        cursor.execute(query, (username, password))
        results = cursor.fetchall()
        
        if len(results) > 0:
            return jsonify({'message': 'Login exitoso'})
        else:
            return jsonify({'message': 'Usuario o contraseña incorrectos'})
        
        cursor.close()
        conexion_bd.cerrar_conexion()
    else:
        return jsonify({'message': 'Error en la conexión a la base de datos'})

if __name__ == '__main__':
    app.run(debug=True)
