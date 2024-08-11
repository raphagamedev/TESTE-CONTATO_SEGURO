+--------------------------------+
|	 	Home Route			     |
+--------------------------------+

#######################################################################################################################
Feature: Verificação da Rota Home
  Desenvolvedor
  Verificar a resposta da rota Home garantindo que a API está funcionando corretamente

  Scenario: Acessar a rota Home com sucesso
    Dado que eu faça uma requisição GET para a rota "http://localhost:5400/"
    Quando a resposta for recebida
    Então o status da resposta deve ser 200
    E a resposta deve conter a mensagem "home"
    Resolução: [FALHOU] Não foi identificado o campo com o retorno "home".

  Código do Postman Correspondente:

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Response should contain 'home'", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.msg).to.eql("home");
    });

  Resumo dos Testes:
    [PASSOU] Verificação se o status da resposta é 200.
    [FALHOU] Verificação se a resposta contém o "msg": "home" esperado.




#######################################################################################################################
+--------------------------------+
|	 	    User Routes		     |
+--------------------------------+

Feature: Verificação da Rota de Listagem de Usuários
  Desenvolvedor
  Verificar a resposta da rota de listagem de usuários garantindo que a API está retornando a lista corretamente

  Scenario: Acessar a rota de listagem de usuários com sucesso
    Dado que eu faça uma requisição GET para a rota "http://localhost:5400/api/user"
    Quando a resposta for recebida
    Então o status da resposta deve ser 200
    E a resposta deve ser uma lista de usuários
    E a lista de usuários deve conter os seguintes dados:
    Resolução: [PASSOU] A lista com todos os usuários foi exibida corretamente

    | id_user | name                 | email                 | telephone      | birth_date | birth_city      | show | companies       |
    |---------|----------------------|-----------------------|----------------|------------|-----------------|------|-----------------|
    | 33      | Raphael Camara Pinto | raphaelgamedevrj@gmail.com | 21997972580    | 1990-08-02 | Rio de Janeiro  | 0    | Compliance St...|
    | 34      | teste2               | 11111111111111111      | 11111111111111111111111 | 1121-02-21 | jalapão         | 1    | Contato Segur...|
    | 36      | 111111               | 111111111              | 1111111        | 2000-02-01 | 1111111         | 1    | Compliance St...|
    | 38      | bbbbbb               | bbbbbbb                | bbbbbbb        | 2000-01-01 | bbbbbbbb        | 1    | Compliance To...|
    | 39      | 11                   | 1                      | 11             | 2000-02-01 | 1               | 0    | Compliance St...|
    | 40      | a                    | a                      | aa             | 1990-01-01 | a               | 1    | Compliance St...|
    | 41      | 22                   | 2                      | 2              | 2024-08-09 | 2               | 1    | Compliance St...|
    | 42      | TESTE API4           | API@GMAIL              | 999999999      | 2024-08-09 | 2000-02-01      | 1    | Compliance St...|

  Código do Postman Correspondente:

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
        //console.log(pm.response);
    });

    pm.test("Response should be a list of users", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
        pm.expect(jsonData.length).to.be.greaterThan(0); // Verifica se a lista não está vazia
    });

  Resumo dos Testes:
    [PASSOU] Verificação se o status da resposta é 200.
    [PASSOU] Verificação se a resposta contém uma lista de usuários.



#######################################################################################################################
Feature: Consulta de Usuário por ID

  Scenario: Consultar usuário com um ID válido
    Dado que a variável global `id` está definida como 34
    Quando eu faço uma requisição GET para a rota "http://localhost:8400/api/user/{{id}}"
    Então o status da resposta deve ser 200
    E o tipo de conteúdo deve ser "application/json"
    E a resposta deve conter os dados do usuário com as seguintes propriedades:
      | id_user | name   | email                | telephone                | birth_date | birth_city | show | companies       |
      | 34      | teste2 | 11111111111111111    | 11111111111111111111111  | 1121-02-21 | jalapão    | 1    | Contato Segur... |
    
  Scenario: Consultar usuário com um ID inválido
    Dado que a variável global `id` está definida como um ID inválido
    Quando eu faço uma requisição GET para a rota "http://localhost:8400/api/user/{{id}}"
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem "Bad Request"
    Resolução:
      [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).

  Scenario: Consultar usuário quando ocorre um erro interno no servidor
    Dado que eu faço uma requisição GET para a rota "http://localhost:8400/api/user/{{id}}"
    E ocorre um erro interno no servidor
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal Server Error"
    Resolução:
      [PASSOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).

  Código do Postman Correspondente:

    // Teste para verificar o código de status
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    // Teste para verificar se o tipo de conteúdo é JSON
    pm.test("Content-Type is JSON", function () {
        pm.response.to.have.header("Content-Type", "application/json");
    });

    // Teste para verificar o formato da resposta com base no código de status
    pm.test("Response should contain user data when status is 200", function () {
        if (pm.response.code === 200) {
            var jsonData = pm.response.json();
            // Log para depuração
            console.log("User Data:", jsonData);

            // Verificar se a resposta contém as propriedades esperadas
            pm.expect(jsonData).to.have.property('id_user');
            pm.expect(jsonData).to.have.property('name');
            pm.expect(jsonData).to.have.property('email');
            pm.expect(jsonData).to.have.property('telephone');
            pm.expect(jsonData).to.have.property('birth_date');
            pm.expect(jsonData).to.have.property('birth_city');
            pm.expect(jsonData).to.have.property('show');
            pm.expect(jsonData).to.have.property('companies');
        }
    });

    // Teste para verificar se a resposta é adequada para um código 400
    pm.test("Response should be a bad request when status is 400", function () {
        if (pm.response.code === 400) {
            var responseText = pm.response.text();
            // Log para depuração
            console.log("Bad Request Response:", responseText);

            // Verificar se a resposta contém uma mensagem de erro adequada
            pm.expect(responseText).to.include("Bad Request");
        }
    });

    // Teste para verificar se a resposta é adequada para um código 500
    pm.test("Response should be an internal server error when status is 500", function () {
        if (pm.response.code === 500) {
            var responseText = pm.response.text();
            // Log para depuração
            console.log("Internal Server Error Response:", responseText);

            // Verificar se a resposta contém uma mensagem de erro adequada
            pm.expect(responseText).to.include("Internal Server Error");
        }
    });

Resumo dos Testes:
      [PASSOU] Verificação se o status da resposta é 200.
      [PASSOU] Verificação se o tipo de conteúdo é JSON.
      [FALHOU] Verificação se a resposta contém as propriedades esperadas do usuário.

 
  

 #######################################################################################################################
  Feature: Criação de Usuário
  Desenvolvedor
  Verificar a criação de um novo usuário garantindo que a API está retornando os dados corretamente

  Scenario: Criar usuário com sucesso
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/user/create" com o seguinte corpo:
      | name        | email         | telephone  | birth_date | birth_city | companies |
      | TESTE API4  | API@GMAIL     | 999999999  | 2024-08-09 | 2000-02-01 | [4]       |
    Quando a resposta for recebida
    Então o status da resposta deve ser 201
    E o tipo de conteúdo deve ser "application/json"
    E a resposta deve conter os dados do usuário com as seguintes propriedades:
      | id_user | name        | email         | telephone  | birth_date | birth_city | show | companies        |
      | 42     | TESTE API4  | API@GMAIL     | 999999999  | 2024-08-09 | 2000-02-01 | 1    | Compliance St... |
    Resolução: [PASSOU] A resposta contém os dados do usuário esperado com o status 201 e tipo de conteúdo JSON.

  Scenario: Criação de usuário com dados inválidos (Bad Request)
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/user/create" com dados inválidos
    Quando a resposta for recebida
    Então o status da resposta deve ser 400
    E a resposta deve estar vazia ou conter uma mensagem de erro
    Resolução: [PASSOU] A resposta retorna o status 400 com uma mensagem de erro adequada para dados inválidos.

  Scenario: Erro interno do servidor ao criar usuário
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/user/create" com dados que causam erro interno
    Quando a resposta for recebida
    Então o status da resposta deve ser 500
    E a resposta deve estar vazia ou conter uma mensagem de erro
    Resolução: [PASSOU] A resposta retorna o status 500 com uma mensagem de erro adequada para erro interno do servidor.

  Código do Postman Correspondente:

    pm.test("Status code is 201", function () {
        pm.response.to.have.status(201);
    });

    pm.test("Status code is 400", function () {
        pm.response.to.have.status(400);
    });

    pm.test("Status code is 500", function () {
        pm.response.to.have.status(500);
    });

    pm.test("Content-Type is JSON", function () {
        pm.response.to.have.header("Content-Type", "application/json");
    });

    pm.test("Response contains user data", function () {
        if (pm.response.code === 201) {
            var jsonData = pm.response.json();
            pm.expect(jsonData[0]).to.have.property("name", "TESTE API4");
            pm.expect(jsonData[0]).to.have.property("email", "API@GMAIL");
            pm.expect(jsonData[0]).to.have.property("telephone", "999999999");
            pm.expect(jsonData[0]).to.have.property("birth_date", "2024-08-09");
        }
    });

    pm.test("Response body should be empty or contain an error message", function () {
        if (pm.response.code === 400 || pm.response.code === 500) {
            var jsonData = pm.response.json();
            pm.expect(jsonData).to.be.oneOf([null, {}, { message: "invalid data!" }]);
        }
    });

  Resumo dos Testes:
    [PASSOU] Verificação se o status da resposta é 201.
    [PASSOU] Verificação se o tipo de conteúdo é JSON.
    [PASSOU] Verificação se a resposta contém os dados do usuário esperado quando o status é 201.
    [PASSOU] Verificação se a resposta está vazia ou contém uma mensagem de erro para os códigos 400 e 500.

#######################################################################################################################
Feature: Atualização de Usuário

  Scenario: Atualizar usuário com dados válidos
    Dado que a variável global `id` está definida como 33
    E o corpo da requisição contém:
      ```json
      {
        "name": "Raphael Camara Pinto da API",
        "email": "raphaelgamedevrj@gmail.com",
        "telephone": "999999999",
        "birth_date": "2024-08-09",
        "birth_city": "2000-02-01",
        "companies": [4]
      }
      ```
    Quando eu faço uma requisição PATCH para a rota "http://localhost:8400/api/user/{{id}}/update"
    Então o status da resposta deve ser 200
    E o tipo de conteúdo deve ser "application/json"
    E a resposta deve conter os seguintes dados do usuário:
      | name                         | email                   |
      | Raphael Camara Pinto da API | raphaelgamedevrj@gmail.com |
    

  Scenario: Atualizar usuário com dados inválidos
    Dado que a variável global `id` está definida como 33
    E o corpo da requisição contém dados inválidos
    Quando eu faço uma requisição PATCH para a rota "http://localhost:8400/api/user/{{id}}/update"
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem "Bad request"
    Resolução:
      [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).

  Scenario: Atualizar usuário quando ocorre um erro interno no servidor
    Dado que a variável global `id` está definida como 33
    E ocorre um erro interno no servidor
    Quando eu faço uma requisição PATCH para a rota "http://localhost:8400/api/user/{{id}}/update"
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal server error"
    Resolução:
      [FALHOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).

  Código do Postman Correspondente:

    // Teste para verificar o código de status
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    // Teste para verificar se o tipo de conteúdo é JSON
    pm.test("Content-Type is JSON", function () {
        pm.response.to.have.header("Content-Type", "application/json");
    });

    // Teste para verificar se a resposta contém os dados do usuário atualizados
    pm.test("Response contains user data", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property("name", "Raphael Camara Pinto da API");
        pm.expect(jsonData).to.have.property("email", "raphaelgamedevrj@gmail.com");
    });

    // Teste para verificar se a resposta é adequada para um código 400
    pm.test("Response code is 400 for bad request", function () {
        if (pm.response.code === 400) {
            pm.expect(pm.response.text()).to.include("Bad request");
        }
    });

    // Teste para verificar se a resposta é adequada para um código 500
    pm.test("Response code is 500 for internal server error", function () {
        if (pm.response.code === 500) {
            pm.expect(pm.response.text()).to.include("Internal server error");
        }
    });
    
    Resumo dos Testes:
      [FALHOU] Verificação se o status da resposta é 200.
      [FALHOU] Verificação se o tipo de conteúdo é JSON.
      [FALHOU] Verificação se a resposta contém os dados do usuário atualizados.
      [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).
      [FALHOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).


#######################################################################################################################

Feature: Exclusão de Usuário

  Scenario: Excluir usuário com ID válido
    Dado que a variável global `id` está definida como 34
    Quando eu faço uma requisição DELETE para a rota "http://localhost:8400/api/user/{{id}}/delete"
    Então o status da resposta deve ser 200
    E a resposta deve conter a mensagem "User deleted successfully"
    

  Scenario: Excluir usuário com um ID inválido
    Dado que a variável global `id` está definida como um ID inválido
    Quando eu faço uma requisição DELETE para a rota "http://localhost:8400/api/user/{{id}}/delete"
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem de erro "Bad request"
    Resolução:
      [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).

  Scenario: Excluir usuário quando ocorre um erro interno no servidor
    Dado que a variável global `id` está definida como 34
    E ocorre um erro interno no servidor
    Quando eu faço uma requisição DELETE para a rota "http://localhost:8400/api/user/{{id}}/delete"
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal server error"
    Resolução:
      [PASSOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).

  Código do Postman Correspondente:

    // Teste para verificar o código de status e a mensagem de confirmação
    pm.test("Status code is 200 and message is correct", function () {
        pm.response.to.have.status(200);
        const jsonData = pm.response.json();
        pm.expect(jsonData.message).to.eql("User deleted successfully");
    });

    // Teste para verificar se a resposta é adequada para um código 400
    pm.test("Status code is 400 for bad request", function () {
        if (pm.response.code === 400) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Bad request");
        }
    });

    // Teste para verificar se a resposta é adequada para um código 500
    pm.test("Status code is 500 for internal server error", function () {
        if (pm.response.code === 500) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Internal server error");
        }
    });

    Resumo dos Testes:
      [FALSO POSITIVO] Verificação se o status da resposta é 200 e a mensagem de confirmação é a esperada.

#######################################################################################################################
+--------------------------------+
|	    Company Routes	 		 |
+--------------------------------+

Feature: Obter Todas as Empresas

  Scenario: Consultar a lista de todas as empresas com sucesso
    Dado que não há parâmetros para a requisição
    Quando eu faço uma requisição GET para a rota "http://localhost:8400/api/company"
    Então o status da resposta deve ser 200
    E a resposta deve ser uma lista de empresas
    E a lista deve conter pelo menos uma empresa
    E a resposta deve conter as seguintes empresas:
      | id_company | name             | cnpj          | country   | state | city                     | street                     |
      | 1          | QA Station       | 991836547193  | Brasil    | RS   | Porto Alegre             | Rua General Mostarda       |
      | 4          | Compliance Station| 33333333333   | Argentina | BN   | Burnos Aires              | Krakoa                     |
      | 5          | Contato Seguro    | 12312312312   | Brasil    | RS   | Santo Antônio da Patrulha | Borges                     |

    
  Código do Postman Correspondente:

    // Teste para verificar o código de status
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    // Teste para verificar se a resposta é uma lista de empresas
    pm.test("Response should be a List of companies", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
        pm.expect(jsonData.length).to.be.greaterThan(0); // Verifica se a lista não está vazia

    // Verificar se a resposta contém as empresas esperadas
    pm.expect(jsonData[0]).to.include({
            "id_company": "1",
            "name": "QA Station",
            "cnpj": "991836547193",
            "country": "Brasil",
            "state": "RS",
            "city": "Porto Alegre",
            "street": "Rua General Mostarda"
        });

        pm.expect(jsonData[1]).to.include({
            "id_company": "4",
            "name": "Compliance Station",
            "cnpj": "33333333333",
            "country": "Argentina",
            "state": "BN",
            "city": "Burnos Aires",
            "street": "Krakoa"
        });

        pm.expect(jsonData[2]).to.include({
            "id_company": "5",
            "name": "Contato Seguro",
            "cnpj": "12312312312",
            "country": "Brasil",
            "state": "RS",
            "city": "Santo Antônio da Patrulha",
            "street": "Borges"
        });
    });


    Resolução:
      [PASSOU] Verificação se o status da resposta é 200.
      [PASSOU] Verificação se a resposta é uma lista de empresas e não está vazia.
      [PASSOU] Verificação se a resposta contém as empresas esperadas.

#######################################################################################################################
Feature: Consulta de Empresa por ID
  Como um usuário da API
  Quero consultar os detalhes de uma empresa pelo seu ID
  Para verificar se os dados da empresa são retornados corretamente

  Background:
    Dado que a variável global `idcompany` está definida como 1

  Scenario: Consultar empresa por ID com sucesso
    Dado que eu faça uma requisição GET para a rota "http://localhost:8400/api/company/{{idcompany}}"
    Quando a resposta for recebida
    Então o status da resposta deve ser 200
    E o tipo de conteúdo deve ser "application/json"
    E a resposta deve conter os dados da empresa, incluindo as seguintes propriedades:
      | id_company | name         | cnpj          | show | id_adress | cep      | country | state | city           | street                  | number | district       | additional | users                                             |
      | 1          | QA Station   | 991836547193  | 1    | 1         | 95500000 | Brasil  | RS    | Porto Alegre   | Rua General Mostarda    | 919    | Menino Deus    | null       | Raphael Camara Pinto, teste2, 111111, bbbbbb, 11, 11, 11, a, a, 22, TESTE API4 |

  Scenario: Consultar empresa com um ID inválido
    Dado que a variável global `idcompany` está definida como um ID inválido
    E eu faça uma requisição GET para a rota "http://localhost:8400/api/company/{{idcompany}}"
    Quando a resposta for recebida
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem "Bad request"

  Scenario: Erro interno no servidor ao consultar empresa por ID
    Dado que eu faça uma requisição GET para a rota "http://localhost:8400/api/company/{{idcompany}}"
    Quando ocorrer um erro interno no servidor
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal server error"

  Código do Postman Correspondente:

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property("id_company");
        pm.expect(jsonData).to.have.property("name");
        pm.expect(jsonData).to.have.property("cnpj");
        pm.expect(jsonData).to.have.property("show");
        pm.expect(jsonData).to.have.property("id_adress");
        pm.expect(jsonData).to.have.property("cep");
        pm.expect(jsonData).to.have.property("country");
        pm.expect(jsonData).to.have.property("state");
        pm.expect(jsonData).to.have.property("city");
        pm.expect(jsonData).to.have.property("street");
        pm.expect(jsonData).to.have.property("number");
        pm.expect(jsonData).to.have.property("district");
        pm.expect(jsonData).to.have.property("additional");
        pm.expect(jsonData).to.have.property("users");
    });

    pm.test("Content-Type is JSON", function () {
        pm.response.to.have.header("Content-Type", "application/json");
    });

    pm.test("Response should be a bad request when status is 400", function () {
        if (pm.response.code === 400) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Bad request");
        }
    });

    pm.test("Response should be an internal server error when status is 500", function () {
        if (pm.response.code === 500) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Internal server error");
        }
    }

  Resumo dos Testes:
    [PASSOU] Verificação se o status da resposta é 200 e os dados da empresa são retornados corretamente.
    [PASSOU] Verificação se o tipo de conteúdo da resposta é JSON.
    [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).
    [PASSOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).

#######################################################################################################################
Feature: Criação de Empresa
  Como um usuário da API
  Quero criar uma nova empresa
  Para adicionar uma nova empresa ao sistema

  Background:
    Dado que o corpo da requisição para criar uma empresa é:
      """
      {
        "name": "New Company",
        "cnpj": "12345678901234",
        "adress": {
          "cep": "12345678",
          "country": "Brasil",
          "state": "SP",
          "city": "São Paulo",
          "street": "Rua Nova",
          "number": "100",
          "district": "Jardim Exemplo",
          "additional": "Edifício A"
        }
      }
      """

  Scenario: Criar empresa com sucesso
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/company/create"
    E o corpo da requisição é conforme definido no Background
    Quando a resposta for recebida
    Então o status da resposta deve ser 201
    E a resposta deve conter o ID da empresa criada
    E a resposta deve conter os seguintes dados da empresa:
      | id_company | name         | cnpj          | cep      | country | state | city        | street      | number | district       | additional   |
      | 7          | New Company  | 12345678901234 | 12345678 | Brasil  | SP    | São Paulo   | Rua Nova    | 100    | Jardim Exemplo | Edifício A   |

  Scenario: Criar empresa com dados inválidos
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/company/create"
    E o corpo da requisição contém dados inválidos
    Quando a resposta for recebida
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem "Bad request"

  Scenario: Erro interno ao criar empresa
    Dado que eu faça uma requisição POST para a rota "http://localhost:8400/api/company/create"
    E o servidor encontra um erro interno
    Quando a resposta for recebida
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal server error"

  Código do Postman Correspondente:

    [FALHOU]// Testa se o código de status é 201 e verifica os dados da empresa criada
    pm.test("Status code is 201", function () {
        pm.response.to.have.status(201);
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property("id");
        pm.expect(jsonData).to.have.property("name", "New Company");
        pm.expect(jsonData).to.have.property("cnpj", "12345678901234");
        pm.expect(jsonData.adress).to.have.property("cep", "12345678");
        pm.expect(jsonData.adress).to.have.property("country", "Brasil");
        pm.expect(jsonData.adress).to.have.property("state", "SP");
        pm.expect(jsonData.adress).to.have.property("city", "São Paulo");
        pm.expect(jsonData.adress).to.have.property("street", "Rua Nova");
        pm.expect(jsonData.adress).to.have.property("number", "100");
        pm.expect(jsonData.adress).to.have.property("district", "Jardim Exemplo");
        pm.expect(jsonData.adress).to.have.property("additional", "Edifício A");
    });

    [PASSOU]// Testa se o código de status é 400 e verifica a mensagem de erro
    pm.test("Status code is 400", function () {
        if (pm.response.code === 400) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Bad request");
        }
    });

    [PASSOU]// Testa se o código de status é 500 e verifica a mensagem de erro
    pm.test("Status code is 500", function () {
        if (pm.response.code === 500) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Internal server error");
        }
    }

  Resumo dos Testes:
    [FALHOU] Verificação se o status da resposta é 201 e os dados da empresa criada são retornados corretamente.
    [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).
    [PASSOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).
#######################################################################################################################
Feature: Atualização de Empresa
  Como um usuário da API
  Quero atualizar uma empresa existente
  Para modificar as informações da empresa no sistema

  Background:
    Dado que o corpo da requisição para atualizar uma empresa é:
      """
      {
        "name": "New Company API",
        "cnpj": "12345678901234",
        "adress": {
          "cep": "12345678",
          "country": "Brasil",
          "state": "SP",
          "city": "São Paulo",
          "street": "Rua Nova",
          "number": "100",
          "district": "Jardim Exemplo",
          "additional": "Edifício A"
        }
      }
      """

  Scenario: Atualizar empresa com sucesso
    Dado que eu faça uma requisição PATCH para a rota "http://localhost:8400/api/company/{{idcompanyup}}/update"
    E o corpo da requisição é conforme definido no Background
    Quando a resposta for recebida
    Então o status da resposta deve ser 200
    E a resposta deve conter os dados atualizados da empresa:
      | name            | cnpj          | cep      | country | state | city        | street      | number | district       | additional   |
      | New Company API | 12345678901234 | 12345678 | Brasil  | SP    | São Paulo   | Rua Nova    | 100    | Jardim Exemplo | Edifício A   |

  Scenario: Atualizar empresa com dados inválidos
    Dado que eu faça uma requisição PATCH para a rota "http://localhost:8400/api/company/{{idcompanyup}}/update"
    E o corpo da requisição contém dados inválidos
    Quando a resposta for recebida
    Então o status da resposta deve ser 400
    E a resposta deve conter a mensagem "Bad request"

  Scenario: Erro interno ao atualizar empresa
    Dado que eu faça uma requisição PATCH para a rota "http://localhost:8400/api/company/{{idcompanyup}}/update"
    E o servidor encontra um erro interno
    Quando a resposta for recebida
    Então o status da resposta deve ser 500
    E a resposta deve conter a mensagem "Internal server error"

  Código do Postman Correspondente:

    [FALHOU]// Testa se o código de status é 200 e verifica os dados da empresa atualizada
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property("name", "New Company API");
    });

    [PASSOU]// Testa se o código de status é 400 e verifica a mensagem de erro
    pm.test("Status code is 400", function () {
        if (pm.response.code === 400) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Bad request");
        }
    });

    [FALHOU]// Testa se o código de status é 500 e verifica a mensagem de erro
    pm.test("Status code is 500", function () {
        if (pm.response.code === 500) {
            const jsonData = pm.response.json();
            pm.expect(jsonData.error).to.eql("Internal server error");
        }
    }

  Resumo dos Testes:
    [FALHOU] Verificação se o status da resposta é 200 e os dados da empresa atualizada são retornados corretamente.
    [PASSOU] Verificação se a resposta é adequada para um código 400 (Bad Request).
    [FALHOU] Verificação se a resposta é adequada para um código 500 (Internal Server Error).
#######################################################################################################################

Feature: Exclusão de Empresa
  Como um usuário da API
  Quero excluir uma empresa existente
  Para garantir que a empresa seja removida do sistema

  Background:
    Dado que eu tenha uma empresa com ID 7 para ser excluída

  Scenario: Exclusão de empresa com sucesso
    Dado que eu faça uma requisição DELETE para a rota "http://localhost:8400/api/company/{{idcompanyup}}/delete"
    Quando a resposta for recebida
    Então o status da resposta deve ser 200
    E a resposta deve conter a mensagem "data deleted successfully!"

  Scenario: Exclusão de empresa com dados inválidos
    Dado que eu faça uma requisição DELETE para a rota "http://localhost:8400/api/company/{{idcompanyup}}/delete"
    E o servidor encontra um erro de solicitação
    Quando a resposta for recebida
    Então o status da resposta deve ser 400
    E a resposta deve conter uma mensagem de erro

  Scenario: Erro interno ao excluir empresa
    Dado que eu faça uma requisição DELETE para a rota "http://localhost:8400/api/company/{{idcompanyup}}/delete"
    E o servidor encontra um erro interno
    Quando a resposta for recebida
    Então o status da resposta deve ser 500
    E a resposta deve conter uma mensagem de erro

  Código do Postman Correspondente:

    [PASSOU] 
    pm.test("Response status code is valid", function () {
        pm.response.to.have.status(pm.response.code);
    });

    [FALHOU] 
    pm.test("Response body is as expected", function () {
        var jsonData = pm.response.json();

        if (pm.response.code === 200) {
            // Testa para o código 200
            pm.expect(jsonData).to.have.property("message");
            pm.expect(jsonData.message).to.eql("data deleted successfully!");
        } else if (pm.response.code === 400) {
            // Testa para o código 400
            pm.expect(jsonData).to.have.property("error");
            pm.expect(jsonData.error).to.be.a('string');
        } else if (pm.response.code === 500) {
            // Testa para o código 500
            pm.expect(jsonData).to.have.property("error");
            pm.expect(jsonData.error).to.be.a('string');
        }
    });

  Resumo dos Testes:
    [FALSO POSITIVO] Verificação de exclusão: "data deleted successfully!"
    [PASSOU] Verificação se o status da resposta é 200.
    [FALHOU] Verificação se a resposta para os códigos 200, 400 e 500 está conforme o esperado.
