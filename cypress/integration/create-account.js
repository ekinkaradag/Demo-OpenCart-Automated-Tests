/// <reference types="cypress" />

describe('Create account', () => {
  beforeEach(() => {
    cy.visit("")
    cy.get('a[title="My Account"').contains('My Account').click({force: true});
    cy.get('ul.list-inline a').contains("Register").click();
  })

  it('Unsuccessful', () => {
    //Continue
    cy.get("input[value=Continue]").click();

    //Assert
    cy.get(".alert-danger").then($el => {
      expect($el.text()).to.eq(" Warning: You must agree to the Privacy Policy!")
    })
    cy.get(".text-danger").each(($el, index) => {
      switch(index){
        case 0:
          expect($el.text(), 'Asserting "First Name" field').to.eq("First Name must be between 1 and 32 characters!")
          break;
        case 1:
          expect($el.text(), 'Asserting "Last Name" field').to.eq("Last Name must be between 1 and 32 characters!")
          break;
        case 2:
          expect($el.text(), 'Asserting "E-Mail" field').to.eq("E-Mail Address does not appear to be valid!")
          break;
        case 3:
          expect($el.text(), 'Asserting "Telephone" field').to.eq("Telephone must be between 3 and 32 characters!")
          break;
        case 4:
          expect($el.text(), 'Asserting "Password" field').to.eq("Password must be between 4 and 20 characters!")
          break;
      }

    })
  })

  it('Successful', () => {
    let firstName = "Ekin"
    let lastName = "Karadag"
    let email = "ekin_karadag_only_for_test_purposes@doesnotexist.com"
    let phone = "123456789"
    //Fill in the fields
    cy.get("input[name=firstname]").type(firstName);
    cy.get("input[name=lastname]").type(lastName);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=telephone]").type(phone);
    cy.get("input[name=password]").type("123456");
    cy.get("input[name=confirm]").type("123456");

    //Accept the Privacy Policy
    cy.get(".pull-right").contains("I have read and agree to the ").find("input[name=agree]").click();
    
    //Continue
    cy.get("input[value=Continue]").click();

    //Assert
    cy.get(".alert-danger").should("not.exist")

    cy.get('a[title="My Account"').contains('My Account').click({force: true});
    cy.get('ul.dropdown-menu.dropdown-menu-right li a').contains("My Account").click();
    cy.get('a').contains("Edit your account information").click();

    cy.get("input[name=firstname]").should($firstName => {
      expect($firstName).to.have.value(firstName)
    })
    cy.get("input[name=lastname]").should($lastName => {
      expect($lastName).to.have.value(lastName)
    })
    cy.get("input[name=email]").should($email => {
      expect($email).to.have.value(email)
    })
    cy.get("input[name=telephone]").should($phone => {
      expect($phone).to.have.value(phone)
    })

  })
})
