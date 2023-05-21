export interface Produto {
    descricao: string,
    quantidade_estoque: number,
    valor: number,
    categoria_id: number,
    produto_imagem?: string 
}

export interface Cliente {
    nome: string,
    email: string,
    cpf: string,
    cep?: string,
    rua?: string,
    numero?: string,
    bairro?: string,
    cidade?: string,
    estado?: string
}

export interface Dict {
    key: string,
    value: string
}
