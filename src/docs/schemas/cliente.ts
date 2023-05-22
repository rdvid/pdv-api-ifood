const schemaCliente = {
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
        cpf: {
            type: "string",
            format: "password",
            example: "123456",
            required: true
        },
        cep: {
            type: "string",
            example: "70460214",
            required: true
        },
        rua: {
            type: "string",
            example: "Avenida das Nações",
            required: true
        },
        numero: {
            type: "string",
            example: "215",
            required: true
        },
        bairro: {
            type: "string",
            example: "Asa sul",
            required: true
        },
        cidade: {
            type: "string",
            example: "Brasília",
            required: true
        },
        estado: {
            type: "string",
            example: "DF",
            required: true
        }
    }
}
const schemaClienteResponse = {
    get: {
        status200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "1",
                        required: true
                    }, nome: {
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
                    cpf: {
                        type: "string",
                        format: "password",
                        example: "123456",
                        required: true
                    },
                    cep: {
                        type: "string",
                        example: "70460214",
                        required: true
                    },
                    rua: {
                        type: "string",
                        example: "Avenida das Nações",
                        required: true
                    },
                    numero: {
                        type: "string",
                        example: "215",
                        required: true
                    },
                    bairro: {
                        type: "string",
                        example: "Asa sul",
                        required: true
                    },
                    cidade: {
                        type: "string",
                        example: "Brasília",
                        required: true
                    },
                    estado: {
                        type: "string",
                        example: "DF",
                        required: true
                    }
                }
            }
        },
        objStatus200: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "1",
                    required: true
                }, nome: {
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
                cpf: {
                    type: "string",
                    format: "password",
                    example: "123456",
                    required: true
                },
                cep: {
                    type: "string",
                    example: "70460214",
                    required: true
                },
                rua: {
                    type: "string",
                    example: "Avenida das Nações",
                    required: true
                },
                numero: {
                    type: "string",
                    example: "215",
                    required: true
                },
                bairro: {
                    type: "string",
                    example: "Asa sul",
                    required: true
                },
                cidade: {
                    type: "string",
                    example: "Brasília",
                    required: true
                },
                estado: {
                    type: "string",
                    example: "DF",
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
        status201: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Cliente cadastrado!"
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
        status200: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Usuário atualizado!"
                }
            }
        },
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
                    example: "Cliente não encontrado, favor verificar o Id informado!"
                }
            }
        },
        status409: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "Não é possível prosseguir o CPF informado já existe em nossa base de dados!"
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
    schemaCliente,
    schemaClienteResponse
}