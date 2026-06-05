describe('Gallery Page', () => {
  beforeEach(() => {
    cy.visit('/gallery')
  })

  it('should display the gallery section', () => {
    cy.contains('Our Gallery')
    cy.get('img').should('have.length.at.least', 1)
  })
})
