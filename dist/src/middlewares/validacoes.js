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
exports.emailExiste = exports.validarLogin = exports.validarCamposBody = void 0;
const conexao_1 = __importDefault(require("../conexao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validarCamposBody = (joiSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield joiSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
});
exports.validarCamposBody = validarCamposBody;
const validarLogin = (joiSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        yield joiSchema.validateAsync(req.body);
        const usuario = yield (0, conexao_1.default)('usuarios').where({ email: email });
        const verificarSenha = yield bcrypt_1.default.compare(senha, usuario[0].senha);
        if (!verificarSenha) {
            return res.status(401).json({ mensagem: "senha incorreta." });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
});
exports.validarLogin = validarLogin;
const emailExiste = (vlrEsperado) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const emailExists = !!(yield (0, conexao_1.default)('usuarios').select('*').where({ email: email }).first());
        if (emailExists === vlrEsperado) {
            next();
        }
        else {
            if (emailExists) {
                return res.status(409).json({ mensagem: "Não é possível prosseguir, o e-mail informado já existe em nossa base de dados!" });
            }
            ;
            if (!emailExists) {
                return res.status(401).json({ mensagem: "O usuário informado não foi encontrado, verifique os dados e tente novamente!" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});
exports.emailExiste = emailExiste;
