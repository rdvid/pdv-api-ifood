export const schemaCategoriaResponse = {
    get: {
        status200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    },
                    descricao: {
                        type: "string",
                    }
                }
            },
            example: [
                {
                    id: "31",
                    descricao: "Informatica"
                },
                {
                    id: "37",
                    descricao: "Games"
                },
                {
                    id: "42",
                    descricao: "Informatica"
                }
            ]
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
};