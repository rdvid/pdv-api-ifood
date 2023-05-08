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

const schemaLogin = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: Joi.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
})

const schemaCadastroCliente = Joi.object({
    nome: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    cpf: Joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório!'
    }),
    cep: Joi.required().messages({
        'any.required': 'O campo cep é obrigatório!'
    }),
    rua: Joi.required().messages({
        'any.required': 'O campo rua é obrigatório!'
    }),
    numero: Joi.required().messages({
        'any.required': 'O campo número é obrigatório!'
    }),
    bairro: Joi.required().messages({
        'any.required': 'O campo bairro é obrigatório!'
    }),
    cidade: Joi.required().messages({
        'any.required': 'O campo cidade é obrigatório!'
    }),
    estado: Joi.required().messages({
        'any.required': 'O campo estado é obrigatório!'
    }),
});

const schemaCadastroProduto = Joi.object({
    descricao: Joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
    }),
    quantidade_estoque: Joi.number().required().messages({
        'any.required': 'O campo quantidade em estoque é obrigatório',
    }),
    valor: Joi.number().required().messages({
        'any.required': 'O campo valor é obrigatório',
    }),
    categoria: Joi.number().required().messages({
        'any.required': 'O campo categoria é obrigatório',
    })
});

export {
    schemaCadastroUsuario,
    schemaLogin,
    schemaCadastroCliente,
    schemaCadastroProduto
}