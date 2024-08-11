describe('template spec', () => {
    it('EXCLUSAO DE CADASTRO', () => {
        cy.visit('http://localhost:5400')

    //#######################################################
    // EXCLUIR USUÁRIO
    
    // Verifica se o elemento está visível e força o clique
    cy.get(':nth-child(1) > :nth-child(7) > :nth-child(2)')
    .should('be.visible') // Verifica se o elemento está visível
    .invoke('show') // Força o elemento a ficar visível
    .click({force: true});

    cy.get(':nth-child(1) > :nth-child(7) > :nth-child(2) > img')
    .trigger('mouseover') // Dispara o evento mouseover
    .trigger('mousedown') // Dispara o evento mousedown
    .trigger('mouseup')   // Dispara o evento mouseup
    .click({force: true}); // Finalmente, realiza o clique

    // Espera a janela de aviso aparecer.
    cy.wait(4000); // Tempo de espera (pode ser ajustado conforme necessário)
    
    cy.get('.swal2-confirm').click({force: true});
    })
  })