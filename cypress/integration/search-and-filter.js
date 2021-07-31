/// <reference types="cypress" />

describe('Search & Filter', () => {
  it('Search', () => {
    cy.visit("") //Homepage

    //Search
    cy.get("[name=search]").type("iPhone{enter}");

    //Assert
    cy.get(".product-thumb .caption h4 a").should($item => {
      expect($item, "Asserting the searched item's name").to.have.text("iPhone")
    })
  })

  it('Filter', () => {
    cy.visit("/index.php?route=product/category&path=24") // Phones and PDAs

    cy.get(".product-thumb").should($products => {
      expect($products.length).to.eq(3)
    })

    cy.get(".product-thumb p.price").should($price => {
      expect($price.eq(0)).to.have.text(" $122.00\nEx Tax: $100.00 ")
    })

    // Sort
    cy.get("#input-sort").select("Price (High > Low)")
    
    // Assert
    cy.get(".product-thumb p.price").should($price => {
      expect($price.eq(0)).to.have.text(" $337.99\nEx Tax: $279.99 ")
    })
  })
})
