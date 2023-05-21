import request from 'supertest';
import app from '../index';
import http from 'http';
import dotenv from 'dotenv';
import { pegarTokenValido, criaIdClienteTest, geraProdutoTeste } from './__fixtures__';
dotenv.config();

let server: http.Server;

beforeAll(async () => {
    server = app.listen(3003, () => {
    });
});

afterAll(async () => {
    server.closeAllConnections()
});


// sem o campo cliente_id
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const products = await geraProdutoTeste()
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ observacao: "testes", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(500);
});
// // com o campo cliente_id vazio
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const products = await geraProdutoTeste()
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id: "", observacao: "testes", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(500);
});

// // com cliente_id inexistente na base de dados
test('POST/pedido - Cadastro de pedido deve retornar status 401 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const products = await geraProdutoTeste()
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id: "20", observacao: "testes", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(401);
});
// // sem o campo observação
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(500);
});
// com o campo observação vazio
test('POST/pedido - Cadastro de pedido deve retornar status 201 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)


        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(201);
});
// sem o campo pedido_produtos
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "" })
    expect(response.status).toBe(500);
});
// // com o campo pedido_produtos vazio
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [] })
    expect(response.status).toBe(400);
});
// // sem o campo produto_id
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ quantidade_produto: 1 }] })
    expect(response.status).toBe(500);
});
// // com o campo produto_id vazio
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: "", quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(500);
});
// // com o campo produto_id inexistente na base de dados
test('POST/pedido - Cadastro de pedido deve retornar status 401 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: 30, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(401);
});
// // sem o campo quantidade_produto
test('POST/pedido - Cadastro de pedido deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id }] })
    expect(response.status).toBe(500);
});
// // com o campo quantidade_produto vazio
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: "" }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(400);
});
// // com o campo quantidade_produto negativo
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: -10 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(400);
});
// // com o campo quantidade_produto nullo
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 0 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(400);
});
// // com quantidade_produto acima do estoque
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1000 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(400);
});
// // dois produtos com o mesmo id no mesmo pedido no limite máximo da quantidade em estoque
test('POST/pedido - Cadastro de pedido deve retornar status 400 ao enviar um corpo de requisição inválido', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto1.id, quantidade_produto: 1 }] })
    expect(response.status).toBe(400);
});
// usuario com token invalido ou expirado
test('GET /pedido com token inválido ou expirado retorna status 500', async () => {
    const response = await request(server)
        .get('/pedido')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ`)
    expect(response.status).toBe(500);
});
// // sem informar id
test('GET /pedido sem informação do id do cliente deve retorna status 200', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .get(`/pedido/`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
});
// // com pedidos existentes para o id informado
test('GET /pedido com informação do id do cliente deve retorna status 200', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)
        .get(`/pedido/?cliente_id=${cliente_id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
});
// limpa banco de dados
test('DELETE /cliente/delete limpa a base de dados', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .delete('/cliente/delete')
        .set('Authorization', `Bearer ${token}`) // limpa a base de dados
    expect(response.status).toBe(204);
});
// // caso não tenha nenhum pedido para o cliente informado
test('GET /pedido com informação do id do cliente deve retorna status 400', async () => {
    const token = await pegarTokenValido()
    const idCliente = await criaIdClienteTest()
    const cliente_id: string = `${idCliente.id}`
    const response = await request(server)
        .get(`/pedido/?cliente_id=${cliente_id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(400);
});
// // caso não seja informado id e não tenha nenhum pedido cadastrado
test('GET /pedido sem informação do id do cliente deve retorna status 200', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .get(`/pedido/`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
});
// Caso o id não exista na base de dados
test('GET /pedido com informação do id do cliente não cadastrado no banco de dados deve retorna status 400', async () => {
    const token = await pegarTokenValido()
    const response = await request(server)
        .get(`/pedido/?cliente_id=20`)
        .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(400);
});