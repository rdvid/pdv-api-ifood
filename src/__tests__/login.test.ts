import request from 'supertest';
import app from '../index';
import http from 'http'

let server: http.Server;

beforeEach((done) => {
  server = app.listen(3003, () => {
    done();
  });
});

afterEach((done) => {
  server.close(() => {
    done();
  });
});

test('POST /login com credenciais validas retorna status 200', async () => {
    const response = await request(server)
      .post('/login')
      .send({ email: 'rafael@admin.com', senha: 'teste' });
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
      .send({ email: 'algum@usuario.com', senha: 'algumasenha' });
    expect(response.status).toBe(500);
});
