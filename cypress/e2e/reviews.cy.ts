describe('Reviews Page', () => {
  beforeEach(() => {
    cy.visit('/reviews')
  })

  it('should display customer reviews', () => {
    cy.contains('What Our Customers Say')
    cy.get('.premium-card').should('have.length.at.least', 1)
  })
})
