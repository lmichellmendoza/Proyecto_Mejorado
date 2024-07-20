import pymysql

class ConexionBD:
    def __init__(self):
        try:
            self.conexion = pymysql.connect(
                host='localhost',
                user='root',
                password='Mendoza1239',
                db='Proyecto_Teleton3'
            )
            self.cursor = self.conexion.cursor()
            print("Conectado a la base de datos")
        except (pymysql.err.OperationalError, pymysql.err.InternalError) as e:
            print("Error de conexión a la base de datos:", e)
    
    def cerrar_conexion(self):
        self.cursor.close()
        self.conexion.close()
