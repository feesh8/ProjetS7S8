from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/accidents', methods=['GET'])
@cross_origin()
def get_accidents():
    accidents = [{
        "id": 1,
        "description": "Accident 1"
    }, {
        "id": 2,
        "description": "Accident 2"
    }]
    return jsonify(accidents)


if __name__ == '__main__':
    app.run(port=5001)
