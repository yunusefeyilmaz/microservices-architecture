import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()
class DAAuthor:
    def __init__(self, app):
        self.app = app
        self.init_app()

    def init_app(self):
        self.mydb = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=os.getenv('DB_PORT'),
            auth_plugin='mysql_native_password'
        )

    def get_authors(self):
        try:
            cur = self.mydb.cursor()
            cur.execute("SELECT * FROM authors")
            authors = cur.fetchall()
            cur.close()
            return authors
        except Exception as e:
            print(e)
            return {'error': str(e), 'message': 'Error getting authors'}

    def add_author(self, name, nationality):
        try:
            author = {'name': name, 'nationality': nationality}
            cur = self.mydb.cursor()
            cur.execute("INSERT INTO authors (name,nationality) VALUES (%s,%s)", (name,nationality))
            self.mydb.commit()  
            cur.close()
            return author
        except Exception as e:
            print(e)
            return False