from flaskext.mysql import MySQL
import os
class DAAuthor:
    def __init__(self, app):
        self.app = app
        self.init_app()
        self.mysql = MySQL()
        self.mysql.init_app(app)

    def init_app(self):
        self.app.config['MYSQL_DATABASE_HOST'] = os.getenv('DB_HOST')
        self.app.config['MYSQL_DATABASE_USER'] = os.getenv('DB_USER')
        self.app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('DB_PASSWORD')
        self.app.config['MYSQL_DATABASE_DB'] = os.getenv('DB_NAME')
        self.app.config['MYSQL_DATABASE_PORT'] = os.getenv('DB_PORT')

    def get_authors(self):
        try:
            cur = self.mysql.get_db().cursor()
            cur.execute("SELECT * FROM authors")
            authors = cur.fetchall()
            cur.close()
            return authors
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}

    def add_author(self, name, nationality):
        try:
            author = {'name': name, 'nationality': nationality}
            cur = self.mysql.get_db().cursor()
            cur.execute("INSERT INTO authors (name,nationality) VALUES (%s,%s)", (name,nationality))
            self.mysql.get_db().commit()
            cur.close()
            return author
        except Exception as e:
            print(e)
            return False