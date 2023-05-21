import request from 'supertest';
import app from '../index';
import http from 'http';
import knex from '../conexao';
import dotenv from 'dotenv';
import { pegarTokenValido, criaIdClienteTest, geraProdutoTeste } from './__fixtures__';
dotenv.config();

let server: http.Server;
let token: string = ""

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
    const idCliente = await criaIdClienteTest()
    const products = await geraProdutoTeste()
    const cliente_id: number = idCliente.id
    const response = await request(server)

        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send({ cliente_id, observacao: "testes", pedido_produtos: [{ produto_id: products.produto1.id, quantidade_produto: 1 }, { produto_id: products.produto2.id, quantidade_produto: 1 }] })// sem o campo e-mail
    expect(response.status).toBe(500);
});
// com o campo cliente_id vazio

// com cliente_id inexistente na base de dados
// sem o campo observação
// com o campo observação vazio
// sem o campo pedido_produtos
// com o campo pedido_produtos vazio
// sem o campo produto_id
// com o campo produto_id vazio
// com o campo produto_id inexistente na base de dados
// sem o campo quantidade_produto
// com o campo quantidade_produto vazio
// com o campo quantidade_produto negativo
// com o campo quantidade_produto nullo
// com quantidade_produto acima do estoque
// dois produtos com o mesmo id no mesmo pedido no limite máximo da quantidade em estoque

// caso não tenha nenhum pedido para o cliente informado
// caso não seja informado id e não tenha nenhum pedido cadastrado
// sem informar id
// com pedidos existentes para o id informado