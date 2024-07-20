import pymysql


class ConexionBD:
    try:
        conexion=pymysql.connect(
            host='localhost',
            user='root',
            password='Mendoza1239',
            db='Proyecto_Teleton3'
        )
        print("Conectado")
    except(pymysql.err.OperationalError,pymysql.err.InternalError)as e:
        print("Error", e)