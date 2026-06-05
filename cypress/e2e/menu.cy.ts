describe('Menu Page & Cart Integration', () => {
  beforeEach(() => {
    cy.visit('/menu')
  })

  it('should display menu items', () => {
    cy.contains('Our Menu').should('be.visible')
    cy.get('app-food-card').should('have.length', 6)
    
    // Check if menu items are displayed
    cy.contains('Margherita Pizza')
    cy.contains('Pepperoni Pizza')
    cy.contains('Garlic Bread')
  })

  it('should add items to cart and show sticky cart bar', () => {
    // Cart should be empty initially (sticky bar hidden from DOM via *ngIf)
    cy.get('.sticky-cart-bar').should('not.exist')
    
    // Add Margherita Pizza to cart
    cy.contains('.card', 'Margherita Pizza').contains('button', 'Add to Cart').click()
    
    // Verify sticky cart bar appears with correct total
    cy.get('.sticky-cart-bar').should('have.class', 'show')
    cy.get('.sticky-cart-bar .badge').should('contain', '1')
    cy.get('.sticky-cart-bar').contains('₹199')
    
    // Add Pepperoni Pizza to cart
    cy.contains('.card', 'Pepperoni Pizza').contains('button', 'Add to Cart').click()
    
    // Verify sticky cart bar updates
    cy.get('.sticky-cart-bar .badge').should('contain', '2')
    cy.get('.sticky-cart-bar').contains('₹498') // 199 + 299
    
    // Test increment quantity directly on food card
    cy.contains('.card', 'Pepperoni Pizza').contains('button', '+').click()
    cy.get('.sticky-cart-bar .badge').should('contain', '3')
    cy.get('.sticky-cart-bar').contains('₹797') // 199 + 598
  })
})
