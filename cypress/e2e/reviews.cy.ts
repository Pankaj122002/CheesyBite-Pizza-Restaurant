describe('Reviews Page', () => {
  beforeEach(() => {
    cy.visit('/reviews')
  })

  it('should display customer reviews', () => {
    cy.contains('Customer Reviews')
    cy.get('.premium-card').should('have.length.at.least', 1)
  })
})
