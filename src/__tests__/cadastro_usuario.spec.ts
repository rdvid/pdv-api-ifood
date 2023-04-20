import request from 'supertest';
import app from '../index';
import { validarCamposBody } from '../middlewares/validacoes';
import { schemaCadastroUsuario } from '../middlewares/schemasJoi';


describe('Cadastro de Usuário', () => {
    it('Deve retornar status 500 ao enviar um corpo de requisição inválido', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({ nome: 'João', senha: '123' }); // sem o campo de email

        expect(res.statusCode).toEqual(500);
    });

    it('Deve retornar status 500 ao enviar um email que já existe no banco de dados', async () => {
        await request(app)
            .post('/usuarios')
            .send({ nome: 'Maria', email: 'maria@teste.com', senha: '123' });

        const res = await request(app)
            .post('/usuarios')
            .send({ nome: 'João', email: 'maria@teste.com', senha: '456' });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('mensagem', 'Não é possível prosseguir, o e-mail informado já existe em nossa base de dados!');
    });

    it('Deve cadastrar um usuário com sucesso', async () => {
        const req = { body: { nome: 'João', email: 'joao@teste.com', senha: '123' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();
        await validarCamposBody(schemaCadastroUsuario)(req as any, res as any, next);
        const resCadastro = await request(app)
            .post('/usuarios')
            .send(req.body);

        expect(resCadastro.statusCode).toEqual(204);
    });
});

describe('Testes do controlador cadastrarUsuario', () => {
    it('Deve cadastrar um usuário e retornar status 204', async () => {
        const novoUsuario = {
            nome: 'Jest usuario de teste',
            email: 'jest@teste.com',
            senha: '123456'
        };

        const res = await request(app)
            .post('/usuarios')
            .send(novoUsuario)
            .set('Accept', 'application/json');

        expect(res.status).toBe(204);
    });

    it('Deve retornar status 500 se houver erro interno no servidor', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({})
            .set('Accept', 'application/json');

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('mensagem', 'O campo nome é obrigatório!');
    });
});
