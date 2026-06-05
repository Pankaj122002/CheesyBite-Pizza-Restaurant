describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display contact details and form', () => {
    cy.contains('Get In Touch')
    cy.get('form').should('exist')
  })
})
