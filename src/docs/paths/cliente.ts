import { schemaCliente, schemaClienteResponse } from '../schemas/cliente';
import { schemaUsuarios, schemaUsuariosResponse } from '../schemas/usuario';

export const pathCliente = {
    "/cliente": {
        post: {
            tags: [
                "Cliente"
            ],
            summary: "Cadastrar Cliente",
            description: "Cadastra um novo cliente",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            requestBody: {
                description: "Cadastre um novo cliente",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaCliente
                        }
                    }
                }
            },
            required: true,
            responses: {
                201: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.post.status201
                            }
                        }
                    }
                },
                400: {
                    description: "Mensagem informando erro com o CPF informado",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.post.status400
                            }
                        }
                    }
                },
                409: {
                    description: "Erro interno",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.post.status409
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor!",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.post.status500
                            }
                        }
                    }
                }
            }
        },
        get: {
            tags: [
                "Cliente"
            ],
            summary: "Listar clientes",
            description: "Lista todos os clientes cadastradas no sistema!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.get.status200
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.get.status500
                            }
                        }
                    }
                }
            }
        }
    },
    "/cliente/{id}": {
        put: {
            tags: [
                "Cliente"
            ],
            summary: "Atualizar cliente",
            description: "Atualiza cadastro do cliente!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do cliente",
                    required: true
                }
            ],
            requestBody: {
                description: "Digite os dados atualizados do cliente",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaCliente
                        }
                    }
                }
            },
            required: true,
            responses: {
                201: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.put.status201
                            }
                        }
                    }
                },
                404: {
                    description: "Ocorreu um erro com o ID informado",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.put.status404
                            }
                        }
                    }
                },
                409: {
                    description: "Ocorreu um erro com o um dado informado!",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.put.status409
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.put.status500
                            }
                        }
                    }
                }
            }
        },
        get: {
            tags: [
                "Cliente"
            ],
            summary: "Detalhar cliente",
            description: "Detalha um cliente específico pelo ID!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do cliente",
                    required: true
                }
            ],
            required: true,
            responses: {
                201: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.get.objStatus200
                            }
                        }
                    }
                },
                404: {
                    description: "Ocorreu um erro com o ID informado",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.put.status404
                            }
                        }
                    }
                },
                409: {
                    description: "Ocorreu um erro com o um dado informado!",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.put.status409
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.put.status500
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: [
                "Cliente"
            ],
            summary: "Deletara cliente",
            description: "Excluí um cliente informando seu ID!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do cliente",
                    required: true
                }
            ],
            required: true,
            responses: {
                204: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.delete.status204
                            }
                        }
                    }
                },
                404: {
                    description: "Ocorreu um erro com o ID informado",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.delete.status404
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaClienteResponse.delete.status500
                            }
                        }
                    }
                }
            }
        }
    }
}
