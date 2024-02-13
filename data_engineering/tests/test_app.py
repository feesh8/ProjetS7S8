import json
import pytest
from data_engineering.app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_get_accidents(client):
    response = client.get('/api/accidents')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    if data:
        sample_accident = data[0]
        assert 'id' in sample_accident
        assert 'latitude' in sample_accident
        assert 'longitude' in sample_accident
        assert 'date' in sample_accident
        assert 'heure' in sample_accident


def test_get_accidents_by_id(client):
    response = client.get('/api/accidents/1')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert 'Id' in data
    assert 'Date' in data
    assert 'Heure' in data
    assert 'Nombre des personnes décédées' in data
    assert 'NbHopital' in data
    assert 'NbNonHopital' in data
    assert 'adresse' in data
    assert 'vehicule1' in data
    assert 'usager1' in data
    assert 'intersection' in data


def test_invalid_id(client):
    response = client.get('/api/accidents/foo')
    assert response.status_code == 404
    assert response.headers['Content-Type'] == 'application/json'
    data = json.loads(response.data)
    assert 'error' in data
