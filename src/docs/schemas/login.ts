const schemaLogin = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
            example: "thiago@email.com",
            required: true
        },
        senha: {
            type: "string",
            format: "password",
            example: "123456",
            required: true
        }
    }
}
const schemaLoginResponse = {
    status200: {
        type: "object",
        properties: {
            usuario: {
                type: "object",
                example: {
                    id: "31",
                    nome: "Thiago Oliveira de Lima",
                    email: "thiago@email.com"
                }
            },
            token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjo0MiwiaWF0IjoxNjgyMDkwMjY2LCJleHAiOjE2ODIxMTE4NjZ9.WuhckX-j1PSdY2HsommGYwAz9H_QAER_nDbgWfZ8-RA"
            }
        }
    },
    status400: {
        type: "object",
        properties: {
            mensagem: {
                type: "string",
                example: "O campo email é obrigatório!"
            }
        }
    },
    status401: {
        type: "object",
        properties: {
            mensagem: {
                type: "string",
                example: "O usuário informado não foi encontrado, verifique os dados e tente novamente!"
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

export {
    schemaLogin,
    schemaLoginResponse
}