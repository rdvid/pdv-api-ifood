import Joi, { string } from 'joi';

const schemaCadastroUsuario = Joi.object({
    nome: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: Joi.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
});


export {
    schemaCadastroUsuario
}