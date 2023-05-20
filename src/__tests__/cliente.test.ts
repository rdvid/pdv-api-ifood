import request from 'supertest';
import app from '../index';
import http from 'http';
import knex from '../conexao';
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pegarTokenValido } from './__fixtures__';
dotenv.config();
// const senhaJwt: Secret = process.env.JWT_SECRET_KEY!;

let server: http.Server;
let token: string = ""

beforeAll(async () => {
    server = app.listen(3003, () => {
    });
});

afterAll(async () => {
    server.closeAllConnections()
});
// sem o campo nome
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: "wladimir.falcao@gmiil.com", cpf: "184.550.358-97", cep: "88.034-354", rua: "Estrada do Eraldo", numero: "25", bairro: "João Paulo", cidade: "Distrito Federal", estado: "RR" });
    expect(response.status).toBe(500);
});
// sem o campo e-mail
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", cpf: "471.340.670-84", cep: "88.034-354", rua: "Estrada do Eraldo", numero: "25", bairro: "João Paulo", cidade: "Distrito Federal", estado: "RR" });
    expect(response.status).toBe(500);
});
// sem o campo CPF
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.coelho@gmiil.com", cep: "88.034-354", rua: "Estrada do Eraldo", numero: "25", bairro: "João Paulo", cidade: "Distrito Federal", estado: "RR" }); // sem o campo CPF
    expect(response.status).toBe(500);
});
// sem o campo CEP
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.phanter@gmiil.com", cpf: "896.078.446-02", rua: "Estrada do Eraldo", numero: "25", bairro: "João Paulo", cidade: "Distrito Federal", estado: "RR" });
    expect(response.status).toBe(500);
});
// sem o campo rua
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.lagarto@gmiil.com", cpf: "931.363.030-32", cep: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "Belo Horizonte", estado: "BA" });
    expect(response.status).toBe(500);
});
// sem o campo número
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.girafa@gmiil.com", cpf: "233.723.677-31", cep: "88.030-300", rua: "das palmeiras", bairro: "João Paulo", cidade: "Fortaleza", estado: "RS" });
    expect(response.status).toBe(500);
});
// sem o campo bairro
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.pavao@gmiil.com", cpf: "553.691.617-39", cep: "88.034-354", rua: "dos araças", numero: "25", cidade: "Rio de Janeiro", estado: "MG" });
    expect(response.status).toBe(500);
});
// sem o campo cidade
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição sem o objeto cidade', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "Wladimir.bear@gmiil.com", cpf: "553.691.617-39", cep: "88.030-300", rua: "D", numero: "35", bairro: "Lagoa", estado: "AC" });
    expect(response.status).toBe(500);
});
// sem o campo estado
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição sem o campo estado', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "wladimir.leao@gmiil.com", cpf: "766.524.149-29", cep: "83.850-000", rua: "Alibaba", numero: "25", bairro: "João Paulo", cidade: "Caxias do Sul" });
    expect(response.status).toBe(500);
});
// com o campo nome vazio
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "", email: "macaco.voador@gmiil.com", cpf: "280.128.511-05", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo nome vazio
    expect(response.status).toBe(500);
});
// com o campo email vazio
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "", cpf: "536.302.169-27", cep: "", rua: "Cleitinho", numero: "25", bairro: "João Paulo", cidade: "", estado: "SP" }); // com o campo email vazio
    expect(response.status).toBe(500);
});
// com o campo cpf vazio
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "elefante.bailarino@gmail.com", cpf: "", cep: "88034-354", rua: "Lacostinho", numero: "25", bairro: "João Paulo", cidade: "", estado: "AL" }); // com o campo cpf vazio
    expect(response.statusCode).toBe(500);
});
// com o campo cpf com pontos e traço - em um segundo teste retornará 500 se a base de dados não for limpa
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição incompleto', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "canguru.fugilista@gmiil.com", cpf: "352.362.257-36", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cpf com pontos e traço
    expect(response.status).toBe(201);
});
// com o campo email em formato inválido
test('POST /cliente - Cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "efalante@", cpf: "192.286.083-23", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo email em formato inválido
    expect(response.status).toBe(500);
});
// com o campo cpf preenchido com documento não válido
test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "shao.ling@gmail.com", cpf: "0000000000", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cpf preenchido com documento não válido
    expect(response.status).toBe(400);
});
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "mata.porco@gmail.com", cpf: "373.249.650-32", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep vazio
    expect(response.status).toBe(201);
});
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "carrapato.fofoqueiro@gmail.com", cpf: "764.848.768-35", cep: "88.034-354", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep preenchido com ponto e traço
    expect(response.status).toBe(201);
});
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    // com o campo rua vazio
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "rato.usurpador@gmail.com", cpf: "877.226.492-62", cep: "88.030-300", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo rua vazio
    expect(response.status).toBe(201);
});
// com o campo número vazio
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "borboleta.assassina@gmail.com", cpf: "047.557.470-23", cep: "", rua: "violetas azuis", numero: "745", bairro: "João Paulo", cidade: "Tangamandápio", estado: "SL" }); // com o campo número vazio
    expect(response.status).toBe(201);
});
// com o campo bairro vazio
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "morcego.sanguinario@gmiil.com", cpf: "485.211.473-09", cep: "88.030-300", rua: "João Paulo", numero: "25", bairro: "", cidade: "", estado: "" }); // com o campo bairro vazio
    expect(response.status).toBe(201);
});
// com o campo cidade vazio
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "barata.tonta@gmiil.com", cpf: "354.478.953-16", cep: "88.030-300", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cidade vazio
    expect(response.status).toBe(201);
});
// com o campo cep em formato inválido
test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "panda.publicitario@gmiil.com", cpf: "563.386.512-04", cep: "880030-300", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo cep em formato inválido vazio
    expect(response.status).toBe(400);
});
// com o campo estado vazio
test('POST /cliente - Cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "tubarao.carinhoso@gmiil.com", cpf: "499.633.786-92", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo estado vazio
    expect(response.status).toBe(201);
});
// com o campo estado em formato diferente de UF
test('POST /cliente - Cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "tartaruga.violinista@gmiil.com", cpf: "361.595.411-45", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com o campo estado em formato diferente de UF vazio
    expect(response.status).toBe(400);
});
// com e-mail já cadastrado
test('POST /cliente - Cadastro de clientes deve retornar status 409 ao enviar um corpo de requisição com dados já existentes na base', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "tubarao.carinhoso@gmiil.com", cpf: "575.684.085-07", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "PR" }); // com e-mail já cadastrado
    expect(response.status).toBe(409);
});
// com cpf já cadastrado
test('POST /cliente - Cadastro de clientes deve retornar status 409 ao enviar um corpo de requisição com dados já existentes na base', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "hiena.desdentada@gmiil.com", cpf: "499.633.786-92", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com cpf já cadastrado
    expect(response.status).toBe(409);
});
// sem o campo nome
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: "corvo.alegre@gmiil.com", cpf: "915.696.577-00", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo nome
    expect(response.status).toBe(500);
});
// sem o campo email
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", cpf: "488.775.016-18", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo email
    expect(response.status).toBe(500);
});
// sem o campo cpf
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo cpf
    expect(response.status).toBe(500);
});
// sem o campo cep
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "225.549.169-93", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo cep
    expect(response.status).toBe(500);
});
// sem o campo rua
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "420.523.746-47", cep: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo rua
    expect(response.status).toBe(500);
});
// sem o campo numero
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "591.027.353-18", cep: "", rua: "88.030-300", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // sem o campo numero
    expect(response.status).toBe(500);
});
// sem o campo bairro
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "837.786.482-76", cep: "", rua: "88.030-300", numero: "25", cidade: "", estado: "Paraná" }); // sem o campo bairro
    expect(response.status).toBe(500);
});
// sem o campo cidade
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "013.527.251-34", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", estado: "Paraná" }); // sem o campo cidade
    expect(response.status).toBe(500);
});
// sem o campo estado
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "818.666.965-56", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "" }); // sem o campo estado
    expect(response.status).toBe(500);
});
// com o campo nome vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "", email: "coelho.silva@gmiil.com", cpf: "776.775.062-08", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "PR" }); // com o campo nome vazio
    expect(response.status).toBe(500);
});
// com o campo email vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "", cpf: "393.807.296-26", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "SC" }); // com o campo email vazio
    expect(response.status).toBe(500);
});
// com o campo cpf vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "RR" }); // com o campo cpf vazio
    expect(response.status).toBe(500);
});
// com o campo cpf preenchido com documento não válido
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "00000000000", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "RG" }); // com o campo cpf preenchido com documento não válido
    expect(response.status).toBe(400);
});
// com o campo cep preenchido fora do padrão
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Pedro", email: "coelho.silva@gmiil.com", cpf: "075131999965", cep: "880730300", rua: "Flinstons Stone", numero: "25", bairro: "João Paulo", cidade: "Tangamandapio", estado: "PA" }); // com o campo cep preenchido fora do padrão
    expect(response.status).toBe(400);
});
// com o campo cep vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "tatu.bola@gmiil.com", cpf: "426.589.750-90", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "SP" }); // com o campo cep vazio
    expect(response.status).toBe(201);
});
// com o campo rua vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "aranha.costureira@gmiil.com", cpf: "114.185.160-15", cep: "", rua: "", numero: "25", bairro: "João Paulo", cidade: "", estado: "RJ" }); // com o campo rua vazio
    expect(response.status).toBe(201);
});
// com o campo numero vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "unicornio.hetero@gmiil.com", cpf: "502.473.936-14", cep: "", rua: "88.030-300", numero: "", bairro: "João Paulo", cidade: "", estado: "DF" }); // com o campo numero vazio
    expect(response.status).toBe(201);
});
// com o campo bairro vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "cabrito.laconico@gmiil.com", cpf: "438.761.471-40", cep: "", rua: "88.030-300", numero: "25", bairro: "", cidade: "", estado: "PI" }); // com o campo bairro vazio
    expect(response.status).toBe(201);
});
// com o campo cidade vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "vaca.leiteira@gmiil.com", cpf: "353.673.593-29", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "AL" }); // com o campo cidade vazio
    expect(response.status).toBe(201);
});
// com o campo estado fora do padrão UF
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "escorpiao.pirotecnio@gmiil.com", cpf: "641.846.376-55", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "Paraná" }); // com o campo estado fora do padrão UF
    expect(response.status).toBe(400);
});
// com o campo estado vazio
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 201 ao enviar um corpo de requisição com dados faltando', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "perereca.suicida@gmiil.com", cpf: "771.202.462-67", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com o campo estado vazio
    expect(response.status).toBe(201);
});
// com id não cadastrado na base de dados
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 404 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .put(`/cliente/${idtest + 10}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "934.467.151-69", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com id não cadastrado na base de dados
    expect(response.status).toBe(404);
});
// com id não informado
test('PUT /cliente/:id - Alteração do cadastro de clientes deve retornar status 404 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .put(`/cliente/`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: "Wladimir", email: "coelho.silva@gmiil.com", cpf: "818.884.520-56", cep: "", rua: "88.030-300", numero: "25", bairro: "João Paulo", cidade: "", estado: "" }); // com id não informado
    expect(response.status).toBe(404);
});
// cabeçalho Authorization sem o token
test('GET /cliente sem token retorna status 401', async () => {
    const response = await request(server)
        .get('/cliente/')
        .set('Authorization', '') // cabeçalho Authorization sem o token
    expect(response.status).toBe(401);
});
//cabeçalho Authorization com o token inexistente
test('GET /cliente com token inválido ou expirado retorna status 500', async () => {
    const response = await request(server)
        .get('/cliente')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`) //cabeçalho Authorization com o token inexistente
    expect(response.status).toBe(500);
});
// Sem id informado na rota
test('GET /cliente sem informação de id retorna status 200', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .get('/cliente')
        .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
    expect(response.status).toBe(200);
});
// com id especificado
test('GET /cliente/:id retorna um cliente especifico cadastrado no banco de dados', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .get(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
    expect(response.status).toBe(200);
});
// cabeçalho Authorization sem o token
test('GET /cliente/:id sem token retorna status 401', async () => {
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .get(`/cliente/${idtest}`)
        .set('Authorization', '') // cabeçalho Authorization sem o token
    expect(response.status).toBe(401);
});
//cabeçalho Authorization com o token inexistente
test('GET /cliente/:id com token inválido ou expirado retorna status 500', async () => {
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .get(`/cliente/${idtest}`)
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`) //cabeçalho Authorization com o token inexistente
    expect(response.status).toBe(500);
});
// cabeçalho Authorization com o token funcional
test('GET /cliente/:id com token ativo retorna status 200', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .get(`/cliente/${idtest}`)
        .set('Authorization', `Bearer ${token}`) // cabeçalho Authorization com o token funcional
    expect(response.status).toBe(200);
});
// Id inexistente na base de dados
test('GET /cliente/:id detalha um cliente especifico cadastrado no banco de dados', async () => {
    const token = await pegarTokenValido()
    const { id: idtest } = await knex('clientes').orderBy('id', 'desc').first()
    const response = await request(server)
        .get(`/cliente/${idtest + 10}`)
        .set('Authorization', `Bearer ${token}`) // Id inexistente na base de dados
    expect(response.status).toBe(404);
});
test('DELETE /cliente/delete limpa a base de dados', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .delete('/cliente/delete')
        .set('Authorization', `Bearer ${token}`) // limpa a base de dados
    expect(response.status).toBe(204);
}); 