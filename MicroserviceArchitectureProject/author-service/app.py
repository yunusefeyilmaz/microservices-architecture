from flask import Flask, request, jsonify


app = Flask(__name__)

from DAAuthor import DAAuthor 

da_author = DAAuthor(app)
@app.route('/')
def home():
    return 'Author Service'

# Get the authors from the database
@app.route('/authors', methods=['GET'])
def get_authors():
    try:
        print('List of authors requested')
        authors = da_author.get_authors()
        return jsonify(authors), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

# Add an author to the database
@app.route('/authors', methods=['POST'])
def add_author():
    try:
        print('Author creation requested')
        data = request.json
        name = data.get('name')
        nationality = data.get('nationality')
        new_author= da_author.add_author(name=name,nationality=nationality)
        return jsonify(new_author), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=3003, debug=True,host="0.0.0.0")

