describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display contact details and form', () => {
    cy.contains('Location')
    cy.get('.contact-card').should('exist')
  })
})
