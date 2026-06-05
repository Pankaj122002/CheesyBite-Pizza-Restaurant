describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the hero section correctly', () => {
    cy.contains('h1', 'Rom\'s Pizza')
    cy.contains('Authentic Wood-Fired Pizza in Muradnagar')
    cy.contains('a', 'Call Now').should('have.attr', 'href').and('include', 'tel:')
    cy.contains('a', 'Order on WhatsApp').should('have.attr', 'href').and('include', '/menu')
  })

  it('should have working navigation links', () => {
    cy.get('.navbar-nav').contains('Menu').click()
    cy.url().should('include', '/menu')
    
    cy.go('back')
    cy.location('pathname').should('eq', '/')
    cy.get('.navbar-nav').contains('Gallery').click()
    cy.url().should('include', '/gallery')
  })

  it('should render Signature Dishes', () => {
    cy.contains('Our Signature Pizzas').should('be.visible')
    cy.get('.premium-card').should('have.length.at.least', 3)
  })
})
