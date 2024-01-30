from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import csv

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def read_csv(file_path):
    data = []
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
    return data


file_path = '../data/accidents_velo_rennes.csv'
data_velo = read_csv(file_path)


def filter_accident_data(row):
    return {
        'id': row['id'],
        'latitude': row['geo_point_2d'].split(",")[0],
        'longitude': row['geo_point_2d'].split(",")[1],
        'date': row['date'],
        'heure': row['heure'],
        'jsem': row['jsem']
    }


@app.route('/api/accidents', methods=['GET'])
@cross_origin()
def get_accidents():
    filtered_data = [filter_accident_data(row) for row in data_velo]
    return jsonify(filtered_data)


@app.route('/api/accidents/<int:id>', methods=['GET'])
@cross_origin()
def get_accidents_by_id(id):
    try:
        id = int(id)
    except ValueError:
        return jsonify({'error': 'Invalid ID'})
    if id < 0 or id >= len(data_velo):
        return jsonify({'error': 'Invalid ID'})
    return jsonify(data_velo[id - 1])


if __name__ == '__main__':
    app.run(port=5001)
