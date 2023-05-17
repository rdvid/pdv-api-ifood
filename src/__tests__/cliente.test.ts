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
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo nome
    expect(response.status).toBe(500);
});
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo e-mail
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo CPF
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo CEP
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo rua
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", bairro: "João Paulo", cidade: "", estado: "" }); // sem o campo número
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", cidade: "", estado: "" }); // sem o campo bairro
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição sem o objeto cidade', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", estado: "" }); // sem o campo cidade
//     expect(response.status).toBe(500);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição sem o campo estado', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "" }); // sem o campo estado
//     expect(response.status).toBe(500);
// });
// // test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
// //     const response = await request(server)
// //         .post('/cliente')
// //         .set('Authorization', `Bearer ${token}`)
// //         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo vazio
// //     expect(response.status).toBe(400);
// // });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo nome vazio
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo email vazio
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cpf vazio
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição incompleto', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cpf com pontos e traço
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo email em formato inválido
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "0000000000", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cpf preenchido com documento não válido
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "88.034-354", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep preenchido com ponto e traço
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "88.030-300", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo rua vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo número vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "88.030-300", rua: "João Paulo", numero: "25", bairro: "", cidade: "", estado: "" }); // com o campo bairro vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "88.030-300", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cidade vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "880030-300", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep em formato inválido vazio
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo estado vazio
//     expect(response.status).toBe(201);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com o campo estado em formato diferente de UF vazio
//     expect(response.status).toBe(400);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 409 ao enviar um corpo de requisição com dados já existentes na base', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com e-mail já cadastrado
//     expect(response.status).toBe(409);
// });
// test('POST /cliente - Cadastro de clientes deve retornar status 409 ao enviar um corpo de requisição com dados já existentes na base', async () => {
//     const response = await request(server)
//         .post('/cliente')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com cpf já cadastrado
//     expect(response.status).toBe(409);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo nome
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo email
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo cpf
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo cep
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo rua
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo numero
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", cidade: "", estado: "Paraná" }); // sem o campo bairro
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", estado: "Paraná" }); // sem o campo cidade
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "" }); // sem o campo estado
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "PR" }); // com o campo nome vazio
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "SC" }); // com o campo email vazio
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "RR" }); // com o campo cpf vazio
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "889.875.357-73", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "RG" }); // com o campo cpf preenchido com documento não válido
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "8803300", numero: "25", bairro: "João Paulo", cidade: "", estado: "PA" }); // com o campo cep preenchido fora do padrão
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "SP" }); // com o campo cep vazio
//     expect(response.status).toBe(201);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "RJ" }); // com o campo rua vazio
//     expect(response.status).toBe(201);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "", bairro: "João Paulo", cidade: "", estado: "DF" }); // com o campo numero vazio
//     expect(response.status).toBe(201);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "", cidade: "", estado: "PI" }); // com o campo bairro vazio
//     expect(response.status).toBe(201);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "AL" }); // com o campo cidade vazio
//     expect(response.status).toBe(201);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com o campo estado fora do padrão UF
//     expect(response.status).toBe(400);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 204 ao enviar um corpo de requisição com dados faltando', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo estado vazio
//     expect(response.status).toBe(204);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 404 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/${idtest + 10}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com id não cadastrado na base de dados
//     expect(response.status).toBe(404);
// });
// test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 404 ao enviar um corpo de requisição inválido', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .put(`/cliente/`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "567.444.789-87", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com id não informado
//     expect(response.status).toBe(404);
// });
// test('GET /cliente sem token retorna status 401', async () => {
//     const response = await request(server)
//         .get('/cliente/')
//         .set('Authorization', '') // cabeçalho Authorization sem o token
//     expect(response.status).toBe(401);
// });
// test('GET /cliente com token inválido ou expirado retorna status 500', async () => {
//     const response = await request(server)
//         .get('/cliente')
//         .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`) //cabeçalho Authorization com o token inexistente
//     expect(response.status).toBe(500);
// });
// test('GET /cliente com token ativo retorna status 200', async () => {
//     const response = await request(server)
//         .get('/cliente')
//         .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
//     expect(response.status).toBe(200);
// });
// test('GET /cliente/:id retorna um cliente especifico cadastrado no banco de dados', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .get(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
//     expect(response.status).toBe(200);
// });
// test('GET /cliente/:id sem token retorna status 401', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .get(`/cliente/${idtest}`)
//         .set('Authorization', '') // cabeçalho Authorization sem o token
//     expect(response.status).toBe(401);
// });
// test('GET /cliente/:id com token inválido ou expirado retorna status 500', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .get(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`) //cabeçalho Authorization com o token inexistente
//     expect(response.status).toBe(500);
// });
// test('GET /cliente/:id com token ativo retorna status 200', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .get(`/cliente/${idtest}`)
//         .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
//     expect(response.status).toBe(200);
// });
// test('GET /cliente/:id detalha um cliente especifico cadastrado no banco de dados', async () => {
//     const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
//     const response = await request(server)
//         .get(`/cliente/${idtest + 10}`)
//         .set('Authorization', `Bearer ${token}`) // Id inexistente na base de dados
//     expect(response.status).toBe(404);
// });
test('DELETE /cliente/delete limpa a base de dados', async () => {
    const response = await request(server)
        .delete('/cliente/delete')
        .set('Authorization', `Bearer ${token}`) // limpa a base de dados
    expect(response.status).toBe(200);
}); 44