describe('login', () => {
  beforeEach(() => {
    // Arrange
    cy.visit('/')
    cy.screenshot('apos-visitar-pagina')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {
    // ACT
    cy.fazerLoginComCredenciaisValidas()

    // Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    // ACT
    cy.fazerLoginComCredenciaisInvalidas()

    // Assert
    cy.verificarMensagemNoToast('Erro no login. Tente novamente.')
  })

});
