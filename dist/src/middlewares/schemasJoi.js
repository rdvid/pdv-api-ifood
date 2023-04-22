"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaLogin = exports.schemaCadastroUsuario = void 0;
const joi_1 = __importDefault(require("joi"));
const schemaCadastroUsuario = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: joi_1.default.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: joi_1.default.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
});
exports.schemaCadastroUsuario = schemaCadastroUsuario;
const schemaLogin = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: joi_1.default.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
});
exports.schemaLogin = schemaLogin;
