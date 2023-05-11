import request from 'supertest';
import app from '../index';
import http from 'http';
import knex from '../conexao';
let server: http.Server;
let token: string = ""

beforeAll(async () => {
  server = app.listen(3003, () => {
  });
});

afterAll(async () => {
  server.closeAllConnections()
});

test('POST /usuario - Cadastro de usuarios deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
  const response = await request(server)
    .post('/usuario')
    .send({ email: 'thiago@email.com', senha: '123456' }); // sem o campo nome
  expect(response.status).toBe(400);
});

test('POST /usuario - Cadastro de usuarios deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
  const response = await request(server)
    .post('/usuario')
    .set('enviroment', 'teste')
    .send({ nome: 'Thiago Oliveira de Lima', senha: '123456' }); // sem o campo de email
  expect(response.status).toBe(400);
});

test('POST /usuario - Cadastro de usuarios deve cadastrar um usuário com sucesso e retornar status 201', async () => {
  const response = await request(server)
    .post('/usuario')
    .send({ nome: 'Rafael', email: 'rafael@admin.com', senha: 'teste' });
  expect(response.status).toBe(201);
});

test('POST /usuario - Cadastro de usuarios deve retornar status 500 ao enviar um email que já existe no banco de dados', async () => {
  const response = await request(server)
    .post('/usuario')
    .send({ nome: 'Thiago Oliveira de Lima', email: 'teste@teste.com', senha: 'senha' });
  expect(response.status).toBe(409);
});

test('POST /login com credenciais validas retorna status 200', async () => {
  const response = await request(server)
    .post('/login')
    .send({ nome: 'Thiago Oliveira de Lima', email: 'teste@teste.com', senha: 'senha' });
  expect(response.status).toBe(200);
});

test('POST /login com credenciais invalidas retorna status 401', async () => {
  const response = await request(server)
    .post('/login')
    .send({ email: 'rafael@admin.com', senha: 'aaaaa' });
  expect(response.status).toBe(401);
});

test('POST /login sem credenciais retorna status 500', async () => {
  const response = await request(server)
    .post('/login')
    .send({});
  expect(response.status).toBe(500);
});

test('POST /login com credenciais validas retorna status 200', async () => {
  const response = await request(server)
    .post('/login')
    .send({ email: 'rafael@admin.com', senha: 'teste' });
  token = response.body.token
  expect(response.status).toBe(200);
});

test('POST /login com credenciais invalidas retorna status 401', async () => {
  const response = await request(server)
    .post('/login')
    .send({ email: 'rafael@admin.com', senha: 'aaaaa' });
  expect(response.status).toBe(401);
});

test('POST /login sem credenciais retorna status 401', async () => {
  const response = await request(server)
    .post('/login')
    .send({ email: 'algum@usuario.com', senha: 'algumasenha' });
  expect(response.status).toBe(401);
});

test('GET /usuario sem token retorna status 401', async () => {
  const response = await request(server)
    .get('/usuario')
    .set('Authorization', '') // cabeçalho Authorization sem o token
  expect(response.status).toBe(401);
});

test('GET /usuario com token inválido ou expirado retorna status 500', async () => {
  const response = await request(server)
    .get('/usuario')
    .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`) //cabeçalho Authorization com o token inexistente
  expect(response.status).toBe(500);
});

test('GET /usuario com token ativo retorna status 200', async () => {
  const response = await request(server)
    .get('/usuario')
    .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
  expect(response.status).toBe(200);
});

test('GET /categoria lista todas as categorias cadastradas no banco de dados', async () => {
  const response = await request(server)
    .get('/categoria')
    .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
  expect(response.status).toBe(200);
});
