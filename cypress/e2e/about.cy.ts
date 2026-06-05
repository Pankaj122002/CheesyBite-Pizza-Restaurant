describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should display about information', () => {
    cy.contains('Our Story')
  })
})
