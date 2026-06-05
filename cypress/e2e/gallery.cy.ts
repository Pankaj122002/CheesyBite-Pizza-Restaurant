describe('Gallery Page', () => {
  beforeEach(() => {
    cy.visit('/gallery')
  })

  it('should display the gallery section', () => {
    cy.contains('Our Food & Restaurant')
    cy.get('img').should('have.length.at.least', 1)
  })
})
