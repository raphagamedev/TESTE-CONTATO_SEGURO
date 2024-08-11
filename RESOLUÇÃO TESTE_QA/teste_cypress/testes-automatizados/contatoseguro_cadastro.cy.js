describe('template spec', () => {
    it('CADASTRO PADRAO', () => {
        cy.visit('http://localhost:5400')

    //#######################################################
    // CADASTRANDO USUÁRIO
        cy.get('#new-user').click({force: true});
    //-------------------------------------------------------
    // incluindo nome
        cy.get('input[placeholder="Nome"]').type('Teste QA Raphael3');
    //-------------------------------------------------------
    // incluindo e-mail
        cy.get('input[placeholder="Email"]').type('testeQA2@gmail.com');
    //-------------------------------------------------------
    // incluindo telefone
        cy.get('input[placeholder="Telefone"]').type('(55)9978-75452');
    //-------------------------------------------------------
    // cidade de nascimento
        cy.get('input[placeholder="Cidade de nascimento"]').type('Rio de Janeiro');
    
    //-------------------------------------------------------
    // data de nascimento
        cy.get('input[placeholder="Data de nascimento"]').type('1990-02-20');

    //-------------------------------------------------------
    // escolhe empresa
        cy.get('#search_input').click({force: true});
        cy.get('.optionContainer .option').contains('Empresa 1').click();
        
        //clica em qualquer lugar da janela de cadastro para nao sair do processo
        cy.get('.ReactModal__Content input[placeholder="Nome"]').click();
    //-------------------------------------------------------
    // finaliza cadastro
        cy.get('.sc-eCImPb > button').click({force: true});
    })
  })