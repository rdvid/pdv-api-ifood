import { schemaCategoriaResponse } from "../schemas/categorias"
export const pathCategoria = {
    "/categoria": {
        get: {
            tags: [
                "Categoria"
            ],
            summary: "Listar Categorias",
            description: "Lista todas as categorias cadastradas no sistema!",
            responses: {
                200: {
                    description: "Operação concluida com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaCategoriaResponse.get.status200
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informado que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaCategoriaResponse.get.status500
                            }
                        }
                    }
                }
            }
        }
    }
}