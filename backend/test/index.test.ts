import request from 'supertest';
import { app, listener } from '../src/index';

describe('User Endpoints', () => {
    
  it('GET /api/accidents should show all accidents', async () => {
    const res = await request(app).get('/api/accidents');
    expect(res.status).toEqual(200);
    // Assurez-vous que la réponse est un tableau
    expect(res.body).toBeInstanceOf(Array);

    // Vérifiez le nombre d'éléments dans le tableau
    expect(res.body.length).toEqual(965);

    // Vérifiez que tous les éléments ont les propriétés attendues
    res.body.forEach((accident: any) => {
        expect(accident).toHaveProperty('id');
        expect(accident).toHaveProperty('date');
        expect(accident).toHaveProperty('heure');
        expect(accident).toHaveProperty('latitude');
        expect(accident).toHaveProperty('longitude');
    });
  });

  it('GET /api/accidents/:id should show an accident by ID', async () => {
    const accidentId = 3;
    const res = await request(app).get(`/api/accidents/${accidentId}`);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual('application/json');

    // Assurez-vous que la réponse a les propriétés attendues
    expect(res.body).toHaveProperty('Id', '3');
    expect(res.body).toHaveProperty('Date', '2019-07-07');
    expect(res.body).toHaveProperty('Heure', '18:20');
    expect(res.body).toHaveProperty('NbHopital', '0');
    expect(res.body).toHaveProperty('NbNonHopital', '1');
    expect(res.body).toHaveProperty('Nombre des personnes décédées', '0');
    expect(res.body).toHaveProperty('adresse', 'SAINT-HELIER');
    expect(res.body).toHaveProperty('intersection', 'En X');
    expect(res.body).toHaveProperty('usager1', 'Conducteur');
    expect(res.body).toHaveProperty('usager2', 'Conducteur');
  });

  it('GET /api/accidents/:id should show an accident by ID', async () => {
    const nonExistingId = 966;
    const res = await request(app).get(`/api/accidents/${nonExistingId}`);
    expect(res.status).toEqual(404);
    //expect(res.body).toEqual({ error: 'Invalid ID' });
  });

});

afterAll(() => {
    listener.close();
  });
