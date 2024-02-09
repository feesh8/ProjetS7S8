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
    }


def filter_accident_data_for_byId(row):
    return {
        'Id': row['id'],
        'Date': row['date'],
        'Heure': row['heure'],
        'Nombre des personnes décédées': row['ntu'],
        'NbHopital': row['nbh'],
        'NbNonHopital': row['nbnh'],
        'adresse': row['adresse'],
        'vehicule1': row['vehicule1'],
        'vehicule2': row['vehicule2'],
        'vehicule3': row['vehicule3'],
        'vehicule4': row['vehicule4'],
        'vehicule5': row['vehicule5'],
        'vehicule6': row['vehicule6'],
        'usager1': row['usager1'],
        'usager2': row['usager2'],
        'usager3': row['usager3'],
        'usager4': row['usager4'],
        'usager5': row['usager5'],
        'usager6': row['usager6'],
        'usager7': row['usager7'],
        'usager8': row['usager8'],
        'intersection': row['inter']
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
    return jsonify(filter_accident_data_for_byId(data_velo[id - 1]))


if __name__ == '__main__':
    app.run(port=5001)
