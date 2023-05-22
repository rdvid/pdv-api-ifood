# desafio-backend-05-pdv
![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 5 - Backend

Seja bem vindo(a) ao desafio do módulo 5.

Sua tarefa como desenvolvedor(a) será criar uma API para um PDV (Frente de Caixa). Esse será um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas.


**Importante 1: O diretório ".github" e seu conteúdo não podem ser alterados e muito menos excluídos**

**Importante 2: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação, ok?**

**Importante 3: Para endpoints de cadastro/atualização os objetos de requisição devem conter as propriedades equivalentes as colunas das tabelas.**

**Exemplo:**

```javascript
// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
```

**ATENÇÃO: Todos os endpoints deverão atender os requisitos citados acima.**

## **Banco de dados**

Você precisa criar um Banco de Dados PostgreSQL chamado `pdv`.

**IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script contendo os comandos de criação das tabelas respeitando os nomes das tabelas e colunas respectivamente, além de, conter os comandos para a inserção das categorias que devem ser previamente cadastradas (estão citadas na 1ª Sprint no item Listar Categorias).**

## **Requisitos obrigatórios**

-   A API a ser criada deverá acessar o banco de dados a ser criado `pdv` para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.
-   O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
-   Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
```

<details>
<summary>1ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo: 

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   usuarios
    -   id
    -   nome
    -   email (campo único)
    -   senha
-   categorias
    -   id
    -   descricao

</details>

<details>
<summary><b>Listar categorias</b></summary>

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.

As categorias a seguir precisam ser previamente cadastradas para que sejam listadas no endpoint de listagem das categorias.

## **Categorias**

-   Informática
-   Celulares
-   Beleza e Perfumaria
-   Mercado
-   Livros e Papelaria
-   Brinquedos
-   Moda
-   Bebê
-   Games

</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

</details>

<details>
<summary><b>Efetuar login do usuário</b></summary>

#### `POST` `/login`

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

Critérios de aceite:

    - Validar se o e-mail e a senha estão corretos para o usuário em questão.
    - Gerar um token de autenticação para o usuário.

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Detalhar perfil do usuário logado</b></summary>

#### `GET` `/usuario`

Essa é a rota que permite o usuário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

</details>

<details>
<summary><b>Editar perfil do usuário logado</b></summary>

#### `PUT` `/usuario`

Essa é a rota que permite o usuário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

</details>

<details>
<summary><b>Efetuar deploy da aplicação</b></summary>
<br>

Fazer deploy do projeto e disponibilizar a URL.

</details>

</details>

---

<details>
<summary>2ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo: 

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   produtos
    -   id
    -   descricao
    -   quantidade_estoque
    -   valor
    -   categoria_id
-   clientes
    -   id
    -   nome
    -   email (campo único)
    -   cpf (campo único) 
    -   cep 
    -   rua
    -   numero
    -   bairro
    -   cidade
    -   estado

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Cadastrar Produto</b></summary>

#### `POST` `/produto`

Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema.

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.

</details>

<details>
<summary><b>Editar dados do produto</b></summary>

#### `PUT` `/produto/:id`

Essa é a rota que permite o usuário logado a atualizar as informações de um produto cadastrado.

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.

</details>

<details>
<summary><b>Listar Produtos</b></summary>

#### `GET` `/produto`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados.

Deveremos incluir um parâmetro do tipo query **categoria_id** para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria.

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **categoria_id**, filtrar os produtos de acordo com a categoria, caso o id de categoria informada exista.
    - Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados deverão ser retornados.

</details>

<details>
<summary><b>Detalhar Produto</b></summary>

#### `GET` `/produto/:id`

Essa é a rota que permite o usuário logado obter um de seus produtos cadastrados.  

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.

</details>

<details>
<summary><b>Excluir Produto por ID</b></summary>

#### `DELETE` `/produto/:id`

Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados.  

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.

</details>

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`

Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema.

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

</details>

<details>
<summary><b>Editar dados do cliente</b></summary>

#### `PUT` `/cliente/:id`

Essa é a rota que permite o usuário realizar atualização de um cliente cadastrado.

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

</details>

<details>
<summary><b>Listar Clientes</b></summary>

#### `GET` `/cliente`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.

</details>

<details>
<summary><b>Detalhar Cliente</b></summary>

#### `GET` `/cliente/:id`

Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados.  

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.

</details>

</details>

---

<details>
<summary>3ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo: 

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   pedidos
    -   id
    -   cliente_id
    -   observacao
    -   valor_total
-   pedido_produtos
    -   id
    -   pedido_id
    -   produto_id
    -   quantidade_produto
    -   valor_produto

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedido`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto deverá ser criado um objeto neste array, como ilustrado no objeto de requisição abaixo.
Só deverá ser cadastrado o pedido caso todos produtos vinculados ao pedido realmente existão no banco de dados.

```javascript
// Corpo da requisição para cadastro de pedido (body)
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   cliente_id
        -   pedido_produtos
            -   produto_id
            -   quantidade_produto
    -   Validar se existe cliente para o id enviado no corpo (body) da requisição.
    -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
    -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
    -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados. 
    -   Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.   

</details>

<details>
<summary><b>Listar Pedidos</b></summary>

#### `GET` `/pedido`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados.

Deveremos incluir um parâmetro do tipo query **cliente_id** para que seja possível consultar pedidos por clientes, de modo, que serão filtrados de acordo com o id de um cliente.

```javascript
// Resposta para listagem de pedido (body)
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **cliente_id**, filtrar os pedidos de acordo com o cliente, caso o id do cliente informado exista.
    - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.

</details>

<details>
<summary><b>Aplicar validação na exclusão de produto</b></summary>
<br>

Deverá ser aplicada uma regra de negócio que não permitirá exclusão de produto que tenha sido registrado em algum pedido.

Critérios de aceite:

    - Validar se o produto que está sendo excluído não está vinculado a nenhum pedido, caso estiver, não poderá ser excluído e deverá ser retornada uma mensagem indicando o motivo.

</details>

<details>
<summary><b>Upload de imagem</b></summary>
<br>

#### `POST` `/arquivo/upload`

Essa é a rota que será utilizada para fazer o upload de uma imagem no servidor de armazenamento.

**Atenção:** O nome da imagem deverá ser gerado, de modo, que não deverá ser passada a propriedade relacionada ao nome da imagem.

**Lembre-se:** Cada imagem deverá ter um nome gerado exclusivo, ou seja, não poderá ter risco de uma imagem possuir o mesmo nome de uma outra já existente no servidor de armazenamento.

Critérios de aceite:

    - Validar se a propriedade `imagem`, foi informada no corpo da requisição.
    - Receber a propriedade `imagem` em formato base64 e enviar para o servidor de armazenamento.
    - Obter e retornar a URL da imagem que teve upload concluído.

</details>

<details>
<summary><b>Listar Imagens</b></summary>
<br>

#### `GET` `/arquivo`

Essa é a rota que será utilizada para obter a URL de todas imagens no servidor de armazenamento.

Critérios de aceite:

    - Obter e retornar a URL e o diretório de todas imagens que estão armazenadas dentro do servidor de armazenamento.

</details>

<details>
<summary><b>Aprimorar cadastro de produto</b></summary>
<br>

Deverá ser aprimorado o cadastro de produto para permitir vincular uma imagem a um produto. 
Deverá ser criada uma coluna `produto_imagem` para que seja possível efetuar o vínculo entre a imagem e o produto.

Critérios de aceite:

    - O campo produto_imagem deve ser opcional.

</details>

<details>
<summary><b>Aprimorar atualização de produto</b></summary>
<br>

Deverá ser aprimorada a atualização de produto para permitir vincular uma imagem a um produto existente. 

Critérios de aceite:

    - Caso exista uma imagem vinculada a esse produto, a imagem vinculada anteriormente deverá ser excluída no servidor de armazenamento e substituída pela nova imagem.
    - Caso exista uma imagem vinculada a esse produto, e o campo `produto_imagem` de atualização possuir valor `null`deverá ser excluída a imagem vinculada anteriormente e o valor `null` será atribuído a coluna `produto_imagem` deixando o produto sem imagem vinculada.
</details>

<details>
<summary><b>Aprimorar exclusão de produto</b></summary>
<br>

Deverá ser aprimorada a exclusão de produto para que quando o produto for excluído também seja removida a imagem vinculada a ele na servidor de armazenamento.

Critérios de aceite:

    - Na exclusão do produto a imagem vinculada a este produto deverá ser excluída do servidor de armazenamento.
    
</details>

</details>

## Aulas úteis:

-   [Git e fluxo de trabalho em equipe](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/523a0925-ef87-4bb5-8a3c-f27b97153d15)
-   [Envio de e-mails](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/b325b82e-e47e-4a16-9b3e-982b6bd178e4)
-   [Validações e boas práticas](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/123c52ce-7ffc-4852-befc-f44b115287ac)
-   [Deploy](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/7c620943-de10-4d1c-8275-594a010ef845)
-   [Revisão de deploy](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/70e0bf61-98d0-443e-993c-737fa48adb9b)
-   [Upload de arquivos](https://aulas.cubos.academy/turma/45f23573-f576-4319-ab62-3ad711c11b1d/aulas/a7395d61-454c-40b8-b52f-620dbf65c701)

###### tags: `back-end` `módulo 5` `nodeJS` `PostgreSQL` `API REST` `desafio`
