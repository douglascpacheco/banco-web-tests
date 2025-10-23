Cypress.Commands.add('verificarMensagemNoToast', mensagem => {
    cy.get('.toast').should('have.text', mensagem)
})

Cypress.Commands.add('selecionarOpcaoCombobox', (labeldoCampo, opcao) => {
    cy.get(`label[for=${labeldoCampo}]`).parent().as(`campo-${labeldoCampo}`)
    cy.get(`@campo-${labeldoCampo}`).click()
    cy.get(`@campo-${labeldoCampo}`).contains(opcao).click()
})