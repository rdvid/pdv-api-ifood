const schemaArquivoResponse = {
    get: {
        status200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        example: "img-1647854225569441"
                    },
                    path: {
                        type: "string",
                        example: "img-1647854225569441"
                    },
                    size: {
                        type: "string",
                        example: "36777"
                    },
                    url: {
                        type: "string",
                        example: "https://debbugers.s3.us-east-005.backblazeb2.com/img-1684705343199"
                    }
                }
            },
            example: [
                {
                    title: "img-1456478622144565",
                    path: "img-1456478622144565",
                    size: "36777",
                    url: "https://debbugers.s3.us-east-005.backblazeb2.com/img-1456478622144565"
                },
                {
                    title: "img-1452789663254",
                    path: "img-1452789663254",
                    size: "45879",
                    url: "https://debbugers.s3.us-east-005.backblazeb2.com/img-1452789663254"
                },
                {
                    title: "img-6325874125985",
                    path: "img-6325874125985",
                    size: "12471",
                    url: "https://debbugers.s3.us-east-005.backblazeb2.com/img-6325874125985"
                },
                {
                    title: "img-98523647132254",
                    path: "img-98523647132254",
                    size: "23654",
                    url: "https://debbugers.s3.us-east-005.backblazeb2.com/img-98523647132254"
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
    },
    post: {
        status201: {
            type: "object",
            properties: {
                url: {
                    type: "string",
                    example: "https://debbugers.s3.us-east-005.backblazeb2.com/img-1684705343199"
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
    schemaArquivoResponse
}