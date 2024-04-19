from flask import Flask, request, jsonify

app = Flask(__name__)

authors = []


app.route('/')
def home():
    return 'Yazar Servisi'

@app.route('/authors', methods=['GET'])
def get_authors():
    try:
        print('Yazarlar listeleniyor')
        return jsonify(authors), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/authors', methods=['POST'])
def add_author():
    try:
        print('Yazar ekleme isteği alındı')
        data = request.json
        name = data.get('name')
        nationality = data.get('nationality')
        new_author = {'id': len(authors) + 1, 'name': name, 'nationality': nationality}
        authors.append(new_author)
        return jsonify(new_author), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=3003, debug=True,host="0.0.0.0")

