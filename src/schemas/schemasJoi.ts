import Joi from 'joi';

const schemaCadastroUsuario = Joi.object({
    nome: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'informe um email válido',
        'string.email': 'O valor informado não é um e-mail válido'
    }),
    senha: Joi.required().messages({
        'any.required': 'O campo senha é obrigatório!'
    }),
});

const schemaLogin = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'informe um email válido',
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
    })
});

const schemaCadastroProduto = Joi.object({
    descricao: Joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição não pode ser vazio.'
    }),
    quantidade_estoque: Joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'base.number': 'O campo quantidade_estoque precisa ser numérico.',
        'number.greater': 'Informe uma quantidade válida.',
        'number.integer': 'Campo quantidade deve receber um valor inteiro.'
    }),
    valor: Joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'base.number': 'O campo valor não pode ser vazio.',
        'number.greater': 'Informe um valor válido.',
        'number.integer': 'Por favor, insira um valor inteiro.'
    }),
    categoria_id: Joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo categoria é obrigatório.',
        'base.number': 'O campo categoria_id precisa ser informado.',
    }),
    produto_imagem: Joi.string().uri().messages({
        'string.empty': 'O campo produto_imagem não pode ser vazio.',
        'string.uri': 'campo produto_imagem inválido. Inserir url válida.'
    })
});

const schemaCadastroPedido = Joi.object({
    cliente_id: Joi.number().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
    }),
    observacao: Joi.string().messages({
        
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