import Joi from 'joi';

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

<<<<<<< HEAD
=======
const schemaLogin = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: Joi.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
})


>>>>>>> 6a2265b2058635eaab8a455db6b4f1b41d8afbdf
export {
    schemaCadastroUsuario,
    schemaLogin
}