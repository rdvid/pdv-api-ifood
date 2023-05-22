const schemaUsuarios = {
    type: "object",
    properties: {
        nome: {
            type: "string",
            example: "Thiago Oliveira de Lima",
            required: true
        },
        email: {
            type: "string",
            format: "email",
            example: "thiago@email.com",
            required: true
        },
        senha: {
            type: "string",
            format: "password",
            example: "123456",
            required: true
        }
    }
}
const schemaUsuariosResponse = {
    get: {
        status200: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "31"
                },
                nome: {
                    type: "string",
                    example: "Thiago Oliveira de Lima"
                },
                emai: {
                    type: "string",
                    format: "email",
                    example: "thiago@email.com"
                }
            }
        },
        status500: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Erro interno do servidor!"
                }
            }
        }
    },
    post: {
        status201: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "31"
                },
                nome: {
                    type: "string",
                    example: "Thiago Oliveira de Lima"
                },
                emai: {
                    type: "string",
                    format: "email",
                    example: "thiago@email.com"
                }
            }
        },
        status400: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "O campo email é obrigatório!"
                }
            }
        },
        status409: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Não é possível prosseguir o - email informado já existe em nossa base de dados!"
                }
            }
        },
        status500: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Erro interno do servidor!"
                }
            }
        }
    },
    put: {
        status200: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Usuário atualizado!"
                }
            }
        },
        status500: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Erro interno do servidor!"
                }
            }
        }
    }

}

export {
    schemaUsuarios,
    schemaUsuariosResponse
}