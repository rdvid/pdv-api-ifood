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
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'O campo nome deve ser informado!',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'O campo e-mail deve ser informado!',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    cpf: Joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'O campo cpf deve ser informado!',
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
    categoria_id: Joi.number().required().messages({
        'any.required': 'O campo categoria é obrigatório',
    })
});

const schemaCadastroPedido = Joi.object({
    cliente_id: Joi.string().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'string.empty': 'O campo cliente_id deve ser informado!'
    }),
    observacao: Joi.required().messages({
        'any.required': 'O campo observação é obrigatório'
    }),
    pedido_produtos: Joi.array().required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório'
    }),
    pedido_produto: {
        produto_id: Joi.string().required().messages({
            'any.required': 'O campo produto_id é obrigatório',
            'string.empty': 'O campo produto_id deve ser informado!'
        }),
        quantidade_produto: Joi.string().required().messages({
            'any.required': 'O campo quantidade_produto é obrigatório',
            'string.empty': 'O campo quantidade_produto deve ser informado!'
        })
    }
})


export {
    schemaCadastroUsuario,
    schemaLogin,
    schemaCadastroCliente,
    schemaCadastroProduto,
    schemaCadastroPedido
}