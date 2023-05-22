import { schemaUsuarios, schemaUsuariosResponse } from '../schemas/usuario';

export const pathUser = {
    "/usuario": {
        post: {
            tags: [
                "Usuário"
            ],
            summary: "Cadastrar Usuário",
            description: "Cadastre um novo usuário",
            requestBody: {
                description: "Cadastre um novo usuário",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaUsuarios
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
                                ...schemaUsuariosResponse.post.status201
                            }
                        }
                    }
                },
                400: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.post.status400
                            }
                        }
                    }
                },
                409: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.post.status409
                            }
                        }
                    }
                },
                500: {
                    description: "Operação concluida com sucesso",
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
                "Usuário"
            ],
            summary: "Inspecionar Usuário",
            description: "Detalha informações do usário logado",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            required: true,
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.get.status200
                            }
                        }
                    }
                },
                500: {
                    description: "Mensagem de erro informando que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.get.status500
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: [
                "Usuário"
            ],
            summary: "Editar Usuário",
            description: "Edita informações do cadastro do usuário que está logado!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            requestBody: {
                description: "Informe novos dados para o usuário",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaUsuarios
                        }
                    }
                }
            },
            required: true,
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.put.status200
                            }
                        }
                    }
                },
                500: {
                    description: "Mensagem de erro informando que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaUsuariosResponse.put.status500
                            }
                        }
                    }
                }
            }
        }
    }
}
