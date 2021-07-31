/// <reference types="cypress" />
import 'cypress-file-upload';

describe('Place an order', () => {
  beforeEach(() => {
    cy.visit('/index.php?route=account/login')
    cy.login("ekin_only_for_test_purposes@doesnotexist.org", "123456")
  })

  it('Add an item to cart', () => {
    //Add an item to cart
    cy.get("a").contains("Components").click();
    cy.get(".dropdown-menu li a").contains("Monitors").click();
    cy.get(".product-thumb").contains("Apple Cinema 30").click();

    //Fill in the blanks
    cy.get("#input-option217").select("3"); // Which is Blue
    cy.get("#input-option217").should("have.value", "3")
    cy.get("textarea#input-option209").type("Dummy text")
    cy.get('.fa.fa-upload').attachFile('example.json');
    cy.get("button").contains("Add to Cart").click({force:true});

    //Assert
    cy.get(".alert.alert-success.alert-dismissible a").eq(0).should($item => {
      //BUG: When adding Apple Cinema 30 to the cart, an iPhone gets added to the cart instead
      expect($item, "Asserting the item name which is added to the cart").to.have.text("Apple Cinema 30")
    })
  })

  it('Checkout', () => {
    //Add an item to cart
    cy.get("#cart-total").click();
    cy.get("strong").contains(" Checkout").click();
    cy.get("a.btn.btn-primary").contains("Checkout").click();

    /* UNKNOWN EXPECTATION:
    No item on the site is available to be purchased. So, I added an assertion which is not the best, but still counts as something.
    */

    //Assert
    cy.get(".alert-danger").should($item => {
      expect($item, "Asserting the warning bar").not.to.exist;
    })
  })
})
