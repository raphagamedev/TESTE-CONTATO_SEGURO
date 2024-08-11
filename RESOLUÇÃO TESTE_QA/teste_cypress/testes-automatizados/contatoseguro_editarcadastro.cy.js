describe('template spec', () => {
    it('EDIÇÃO DE CADASTRO', () => {
        cy.visit('http://localhost:5400')

    //#######################################################
    // EDITAR USUÁRIO
        cy.get(':nth-child(1) > :nth-child(7) > :nth-child(1)').click({force: true});
    })
  })