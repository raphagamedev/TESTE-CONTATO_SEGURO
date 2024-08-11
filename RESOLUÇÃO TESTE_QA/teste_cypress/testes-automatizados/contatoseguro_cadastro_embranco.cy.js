describe('template spec', () => {
    it('CADASTRO EM BRANCO', () => {
        cy.visit('http://localhost:5400')

    //#######################################################
    // CADASTRANDO USUÁRIO
        cy.get('#new-user').click({force: true});
    //-------------------------------------------------------  
    
        cy.get('input[placeholder="Nome"]').clear();

    // trigger para subir a mensagem
        cy.get('button[type="submit"]').click();

    // Verificar a mmensagem no input
        cy.get('input[placeholder="Nome"]')
        .invoke('prop', 'validationMessage')
        .should('equal', 'Preencha este campo.');
        
    
    
    //-------------------------------------------------------
    // finaliza cadastro
        cy.get('.sc-eCImPb > button').click({force: true});

    //-------------------------------------------------------    
    
   
    })
  })