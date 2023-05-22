import { schemaLogin, schemaLoginResponse } from "../schemas/login"
export const pathLogin = {
    "/login": {
        post: {
            tags: [
                "Autenticação"
            ],
            summary: "Efetuar login",
            description: "Efetuar login de um usuário já cadastrado no sistema!",
            requestBody: {
                description: "Efetue seu login",
                content: {
                    "application/json": {
                        schema: {
                            ...schemaLogin
                        }
                    }
                },
                required: true
            },
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application / json": {
                            schema: {
                                ...schemaLoginResponse.status200
                            }
                        }
                    },
                },
                400: {
                    description: "Mensagem de erro informando que faltou o envio de algum campo no body da requisição",
                    content: {
                        "application / json": {
                            schema: {
                                ...schemaLoginResponse.status400
                            }
                        }
                    }
                },
                401: {
                    description: "Mensagem de erro informando que faltou o envio de algum campo no body da requisição",
                    content: {
                        "application / json": {
                            schema: {
                                ...schemaLoginResponse.status401
                            }
                        }
                    }
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaLoginResponse.status500
                            }
                        }
                    }
                }
            }
        }
    }
}