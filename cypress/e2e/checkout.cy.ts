describe('Checkout Flow', () => {
  it('should complete the full order flow', () => {
    // 1. Visit Menu and add an item
    cy.visit('/menu')
    cy.contains('.card', 'Farmhouse Veggie Pizza').contains('button', 'Add to Cart').click()
    
    // 2. Navigate to Cart via sticky bar
    cy.get('.sticky-cart-bar').contains('View Cart').click()
    cy.url().should('include', '/cart')
    
    // 3. Verify Cart page
    cy.contains('Your Cart').should('be.visible')
    cy.contains('Farmhouse Veggie Pizza').should('be.visible')
    cy.contains('₹249').should('be.visible')
    
    // 4. Test Customer Form Validation
    // Initially, button should be disabled
    cy.contains('button', 'Review Order').should('be.disabled')
    
    // Fill form (using .first() and force:true to bypass responsive display:none issues)
    cy.get('input[formControlName="fullName"]').first().type('John Doe', { force: true })
    cy.get('input[formControlName="mobileNumber"]').first().type('9876543210', { force: true })
    cy.get('textarea[formControlName="specialInstructions"]').first().type('Make it spicy', { force: true })
    
    // Now button should be enabled
    cy.contains('button', 'Review Order').first().should('not.be.disabled')
    
    // 5. Submit Order
    cy.contains('button', 'Review Order').first().click({ force: true })
    
    // 6. Verify Order Confirmation Page
    cy.url().should('include', '/order-confirmation')
    cy.contains('button', 'Send Order To WhatsApp').should('be.visible')
    cy.contains('John Doe').should('be.visible')
    cy.contains('9876543210').should('be.visible')
    cy.contains('Make it spicy').should('be.visible')
    cy.contains('Grand Total').parent().contains('₹249').should('be.visible')
    
    // Verify WhatsApp button is present
    cy.contains('button', 'Send Order To WhatsApp').should('be.visible')
    
    // Verify the new workflow steps are present
    cy.contains('Complete Your Order in 4 Easy Steps').should('be.visible')
    cy.contains('1. Send Order').should('be.visible')
    cy.contains('2. Get QR Code').should('be.visible')
    cy.contains('3. Pay & Screenshot').should('be.visible')
    cy.contains('4. Ready Time').should('be.visible')
  })

  it('should show empty cart state when nothing is added', () => {
    cy.visit('/cart')
    cy.contains('Your cart is empty').should('be.visible')
    cy.contains('Browse Menu').should('have.attr', 'href').and('include', '/menu')
  })
})
