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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.cadastrarUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const conexao_1 = __importDefault(require("../conexao"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const senhaJwt = process.env.JWT_SECRET_KEY;
const cadastrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha } = req.body;
        const senhaHash = yield bcrypt_1.default.hash(senha.toString(), 10);
        const insert = yield (0, conexao_1.default)('usuarios').insert({ nome, email, senha: senhaHash }).returning(['id', 'nome', 'email']);
        return res.status(201).json(insert[0]);
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});
exports.cadastrarUsuario = cadastrarUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const usuario = yield (0, conexao_1.default)('usuarios').where({ email: email });
        const token = jsonwebtoken_1.default.sign({ usuario: usuario[0].id }, senhaJwt, { expiresIn: "6h" });
        const _a = usuario[0], { senha: _ } = _a, usuarioLogado = __rest(_a, ["senha"]);
        return res.status(200).json({
            usuario: usuarioLogado,
            token
        });
    }
    catch (err) {
        return res.status(500).json({ mensagem: `erro interno do servidor ${err.message}` });
    }
});
exports.login = login;
