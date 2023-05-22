import { schemaArquivoResponse } from '../schemas/arquivo';
import { schemaProduto, schemaProdutoResponse } from '../schemas/produto';

export const pathArquivo = {
    "/arquivos": {
        get: {
            tags: [
                "Arquivo"
            ],
            summary: "listar imagens",
            description: "Lista o URL de todas as imagens cadastradas no sistema",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            responses: {
                200: {
                    description: "Operação concluída com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaArquivoResponse.get.status200
                            }
                        }
                    },
                },
                500: {
                    description: "Mensagem de erro informando que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaArquivoResponse.get.status500
                            }
                        }
                    }
                }
            }
        }
    },
    "/arquivo/upload": {
        post: {
            tags: [
                "Arquivo"
            ],
            summary: "Enviar imagens para a base de dados",
            description: "envia uma nova imagem para a base de dados e retorna uma URL da imagem enviada!",
            security: [
                {
                    "bearerAuth": []
                }
            ],
            consumes: [
                "multipart/form-data"
            ],
            parameters: [
                {
                    in: "formData",
                    name: "arquivo",
                    type: "file",
                    description: "Arquivo de imagem a ser enviado"
                }
            ],
            responses: {
                201: {
                    description: "Operação concluída com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaArquivoResponse.post.status201
                            }
                        }
                    }
                },
                500: {
                    description: "Mensagem de erro informando que ocorreu um erro inesperado no servidor",
                    content: {
                        "application/json": {
                            schema: {
                                ...schemaArquivoResponse.post.status500
                            }
                        }
                    }
                }
            }
        }
    }
};
