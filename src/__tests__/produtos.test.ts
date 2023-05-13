import request from 'supertest';
import app from '../index';
import http from 'http';
import knex from '../conexao';
import { getValidToken } from './__fixtures__'

let server: http.Server;

beforeAll(async () => {
  server = app.listen(3003, () => {
  });
});

afterAll(async () => {
  await knex('produtos').delete()
  server.closeAllConnections()
});

test('GET /produto retorna lista de produtos cadastrados pelo usuario status 200', async () => {
  const token = await getValidToken()
  const response = await request(server)
    .get('/produto')
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(200)
})

test('GET /produto produto inexistente retorna status 404', async () => {
  const token = await getValidToken()
  const response = await request(server)
    .get(`/produto/90`)
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(404)
})

test('POST /produto com valor zerado retorna status 400', async () => {
  const token = await getValidToken()
  const response = await request(server)
    .post('/produto')
    .set('Authorization', `Bearer ${token}`)
    .send({
      descricao: "Bolo de Pote",
      quantidade_estoque: 150,
      valor: 0,
      categoria_id: 4
    })
  expect(response.status).toBe(400);
});

test('POST /produto inserir produto válido retorna status 201', async () => {
  const token = await getValidToken()
  const response = await request(server)
    .post('/produto')
    .set('Authorization', `Bearer ${token}`)
    .send({
      descricao: "teste123",
      quantidade_estoque: 150,
      valor: 150,
      categoria_id: 4
    })
  expect(response.status).toBe(201);
});

test('GET /produto produto existente retorna status 200', async () => {
  const token = await getValidToken()
  const { id } = await knex('produtos').where({ descricao: 'teste123'}).first()
  const response = await request(server)
    .get(`/produto/${id}`)
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(200)
})

test('DELETE /produto deleta produto e retorna status 204', async () => {
  const token = await getValidToken()
  const { id } = await knex('produtos').where({ descricao: 'teste123' }).first()
  const response = await request(server)
    .delete(`/produto/${id}`)
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(204);
});

