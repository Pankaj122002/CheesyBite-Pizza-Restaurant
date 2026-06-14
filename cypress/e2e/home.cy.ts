describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the hero section correctly', () => {
    cy.contains('h1', 'Cheesy')
    cy.contains('Premium artisanal pizza')
    cy.contains('a', 'Call Now').should('have.attr', 'href').and('include', 'tel:')
    cy.contains('a', 'Order on WhatsApp').should('have.attr', 'href').and('include', 'wa.me')
  })

  it('should have working navigation links', () => {
    cy.get('.navbar-nav').contains('Menu').click()
    cy.url().should('include', '/menu')

    cy.go('back')
    cy.location('pathname').should('eq', '/')
    cy.get('.navbar-nav').contains('Gallery').click()
    cy.url().should('include', '/gallery')
  })

  it('should render scroll sections', () => {
    cy.get('.vsection').should('have.length', 6)
    cy.contains('Signature').should('exist')
    cy.contains('Crafted').should('exist')
  })

  it('should display the menu QR code in footer', () => {
    cy.get('img[src="assets/images/menu-qr.png"]').should('exist')
  })

  it('section dot navigation should exist', () => {
    cy.get('.vdot').should('have.length', 6)
  })
})
