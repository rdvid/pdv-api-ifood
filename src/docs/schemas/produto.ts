const schemaProduto = {
    type: "object",
    properties: {
        descricao: {
            type: "string",
            example: "Monitor ultra-wide lg 29 pol",
            required: true
        },
        quantidade_estoque: {
            type: "string",
            example: "7",
            required: true
        },
        valor: {
            type: "string",
            format: "password",
            example: "175900",
            required: true
        },
        categoria: {
            type: "string",
            example: "1",
            required: true
        }
    }
}
const schemaProdutoResponse = {
    get: {
        status200: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "27",
                    required: true
                },
                descricao: {
                    type: "string",
                    example: "Monitor ultra-wide lg 29 pol",
                    required: true
                },
                quantidade_estoque: {
                    type: "string",
                    example: "7",
                    required: true
                },
                valor: {
                    type: "string",
                    format: "password",
                    example: "175900",
                    required: true
                },
                categoria: {
                    type: "string",
                    example: "1",
                    required: true
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
        status200: {
            type: "object",
            properties: {
                descricao: {
                    type: "string",
                    example: "Monitor ultra-wide lg 29 pol",
                    required: true
                },
                quantidade_estoque: {
                    type: "string",
                    example: "7",
                    required: true
                },
                valor: {
                    type: "string",
                    format: "password",
                    example: "175900",
                    required: true
                },
                categoria: {
                    type: "string",
                    example: "1",
                    required: true
                }
            }
        },
        status400: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "CPF inválido. verifique os dados inseridos e tente novamente!"
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
        status201: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Dados alterados com sucesso!"
                }
            }
        },
        status404: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Produto não encontrado, favor verificar o Id informado!"
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
    delete: {
        status204: {
            type: "object",
            properties: {}
        },
        status404: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Cliente não encontrado!"
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
    schemaProduto,
    schemaProdutoResponse
}