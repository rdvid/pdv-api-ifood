import request from 'supertest';
import app from '../index';
import http from 'http';
import knex from '../conexao';
import { getValidToken } from './__fixtures__'

let server: http.Server;
let token: string = ""

beforeAll(async () => {
    server = app.listen(3003, () => {
  });
});

afterAll(async () => {
  server.closeAllConnections()
});

test('GET /produtos com credenciais invalidas retorna status 200', async () => {
  const token = getValidToken()
  const response = await request(server)
    .post('/produto')
    .set('Authorization', `Bearer ${getValidToken()}`)
  expect(response.status).toBe(200);
});
