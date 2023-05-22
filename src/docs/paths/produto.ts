import { schemaProduto, schemaProdutoResponse } from '../schemas/produto';

export const pathProduto = {
    "/produto": {
        get: {
            tags: [
                "Produto"
            ],
            summary: "Listar produtos",
            description: "Lista todos os produtos cadastrados no sistema, ou filtra pelo ID da categoria, caso seja informada!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "query",
                    description: "ID da categoria",
                    required: false
                }
            ],
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.get.status200
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.get.status500
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: [
                "Produto"
            ],
            summary: "Adicionar produto",
            description: "Adiciona um produto a base de dados!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            requestBody: {
                description: "Informe os dados do novo produto!",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaProduto
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.post.status200
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.post.status500
                            }
                        }
                    }
                }
            }
        }
    },
    "/produto/{id}": {
        get: {
            tags: [
                "Produto"
            ],
            summary: "Detalhar produto",
            description: "Detalha um produto identificado pelo ID!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do produto",
                    required: true
                }
            ],
            required: true,
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.get.status200
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.put.status500
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: [
                "Produto"
            ],
            summary: "Atualizar",
            description: "Atualiza um produto identificado pelo ID!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do produto",
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
                                ...schemaProdutoResponse.put.status201
                            }
                        }
                    }
                },
                404: {
                    description: "Ocorreu um erro com o ID informado",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.put.status404
                            }
                        }
                    }
                },
                500: {
                    description: "Erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaProdutoResponse.put.status500
                            }
                        }
                    }
                }
            }
        }
    }
}
