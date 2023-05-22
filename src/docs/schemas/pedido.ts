const schemaPedido = {
    type: "object",
    properties: {
        cliente_id: {
            type: "string",
            example: "23",
            required: true
        },
        observacao: {
            type: "string",
            example: "Em caso de ausência recomendo deixar com algum vizinho",
            required: true
        },
        pedido_produtos: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    produto_id: {
                        type: "string",
                        example: "1"
                    },
                    quantidade_produto: {
                        type: "string",
                        example: "10"
                    }
                },
                required: ["produto_id", "quantidade_produto"]
            },
            example: [
                {
                    produto_id: "1",
                    quantidade_produto: "10"
                },
                {
                    produto_id: "ID_do_Produto_2",
                    quantidade_produto: "20"
                }
            ]
        }
    }
};
const schemaPedidoResponse = {
    get: {
        status200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    pedido: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                example: "1"
                            },
                            valor_total: {
                                type: "string",
                                example: "230010"
                            },
                            observacao: {
                                type: "string",
                                example: null
                            },
                            cliente_id: {
                                type: "string",
                                example: "1"
                            }
                        }
                    },
                    pedido_produtos: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    example: "1"
                                },
                                quantidade_produto: {
                                    type: "string",
                                    example: "1"
                                },
                                valor_produto: {
                                    type: "string",
                                    example: "10"
                                },
                                pedido_id: {
                                    type: "string",
                                    example: "1"
                                },
                                produto_id: {
                                    type: "string",
                                    example: "1"
                                }
                            }
                        }
                    }
                }
            },
            example: [
                {
                    pedido: {
                        id: "1",
                        valor_total: "230010",
                        observacao: "Entregar no periodo da tarde",
                        cliente_id: "1"
                    },
                    pedido_produtos: [
                        {
                            id: "1",
                            quantidade_produto: "1",
                            valor_produto: "10",
                            pedido_id: "1",
                            produto_id: "1"
                        },
                        {
                            id: "2",
                            quantidade_produto: "2",
                            valor_produto: "230000",
                            pedido_id: "1",
                            produto_id: "2"
                        }
                    ]
                }
            ]
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
    },
    post: {
        status201: {
            type: "object",
            properties: {
                mensagem: {
                    type: "string",
                    example: "pedido cadastrado com sucesso!",
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
    }
}

export {
    schemaPedido,
    schemaPedidoResponse
}