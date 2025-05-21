from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/about')
def about():
    return jsonify({
        'name': 'Skajny Portfolio',
        'description': 'Vítejte v mém portfoliu! Jsem vývojář specializující se na moderní webové technologie.',
        'services': [
            'Vývoj webových aplikací',
            'Responsivní webdesign',
            'Frontend vývoj (React, HTML, CSS)',
            'Backend vývoj (Python, Flask)'
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
