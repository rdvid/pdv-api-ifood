import { schemaPedido, schemaPedidoResponse } from '../schemas/pedido';
import { schemaProduto, schemaProdutoResponse } from '../schemas/produto';

export const pathPedido = {
    "/pedido": {
        get: {
            tags: [
                "Pedido"
            ],
            summary: "Listar pedidos",
            description: "Lista os pedidos cadastrados no sistema, ou se informado no query filtra pelo ID do pedido!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            parameters: [
                {
                    name: "cliente_id",
                    in: "query",
                    description: "ID do cliente",
                    required: false
                }
            ],
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaPedidoResponse.get.status200
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
                "Pedido"
            ],
            summary: "Cadastrar pedido!",
            description: "Cadastra um pedido na base de dados!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            requestBody: {
                description: "Informe os dados do novo pedido!",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaPedido
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
                                ...schemaPedidoResponse.post.status201
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaPedidoResponse.post.status500
                            }
                        }
                    }
                }
            }
        }
    }
}
