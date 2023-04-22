"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
let server;
beforeEach((done) => {
    server = index_1.default.listen(3003, () => {
        done();
    });
});
afterEach((done) => {
    server.close(() => {
        done();
    });
});
test('POST /usuarios - Cadastro de usuarios deve retornar status 500 ao enviar um corpo de requisição inválido', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/usuarios')
        .send({ email: 'thiago@email.com', senha: '123456' }); // sem o campo nome
    expect(response.status).toBe(400);
}));
test('POST /usuarios - Cadastro de usuarios deve retornar status 500 ao enviar um corpo de requisição inválido', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/usuarios')
        .send({ nome: 'Thiago Oliveira de Lima', senha: '123456' }); // sem o campo de email
    expect(response.status).toBe(400);
}));
test('POST /usuarios - Cadastro de usuarios deve cadastrar um usuário com sucesso e retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/usuarios')
        .send({ nome: 'Rafael', email: 'rafael@admin.com', senha: 'teste' });
    expect(response.status).toBe(201);
}));
test('POST /usuarios - Cadastro de usuarios deve retornar status 500 ao enviar um email que já existe no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/usuarios')
        .send({ nome: 'Thiago Oliveira de Lima', email: 'rafael@admin.com', senha: '123456' });
    expect(response.status).toBe(409);
}));
test('POST /login com credenciais validas retorna status 200', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({ email: 'rafael@admin.com', senha: 'teste' });
    expect(response.status).toBe(200);
}));
test('POST /login com credenciais invalidas retorna status 401', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({ email: 'rafael@admin.com', senha: 'aaaaa' });
    expect(response.status).toBe(401);
}));
test('POST /login sem credenciais retorna status 500', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({});
    expect(response.status).toBe(500);
}));
test('POST /login com credenciais validas retorna status 200', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({ email: 'rafael@admin.com', senha: 'teste' });
    expect(response.status).toBe(200);
}));
test('POST /login com credenciais invalidas retorna status 401', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({ email: 'rafael@admin.com', senha: 'aaaaa' });
    expect(response.status).toBe(401);
}));
test('POST /login sem credenciais retorna status 500', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(server)
        .post('/login')
        .send({ email: 'algum@usuario.com', senha: 'algumasenha' });
    expect(response.status).toBe(500);
}));
