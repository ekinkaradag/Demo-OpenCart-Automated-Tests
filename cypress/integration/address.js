/// <reference types="cypress" />

describe('Address', () => {
  context("New address - ", () => {
    beforeEach(() => {
      cy.visit('/index.php?route=account/login')
      cy.login("ekin_only_for_test_purposes@doesnotexist.org", "123456")
      cy.visit('/index.php?route=account/address');
      cy.get(".btn").contains("New Address").click()
    })

    it('Add new address with missing fields', () => {
      cy.get("[value=Continue]").click()

      cy.get(".text-danger").each(($el, index) => {
        switch(index){
          case 0:
            expect($el.text(), 'Asserting "First Name" field').to.eq("First Name must be between 1 and 32 characters!")
            break;
          case 1:
            expect($el.text(), 'Asserting "Last Name" field').to.eq("Last Name must be between 1 and 32 characters!")
            break;
          case 2:
            expect($el.text(), 'Asserting "Address 1" field').to.eq("Address must be between 3 and 128 characters!")
            break;
          case 3:
            expect($el.text(), 'Asserting "City" field').to.eq("City must be between 2 and 128 characters!")
            break;
          case 4:
            expect($el.text(), 'Asserting "Region / State" field').to.eq("Please select a country!")
            break;
          case 5:
            expect($el.text(), 'Asserting "Region / State" field').to.eq("Please select a region / state!")
            break;
        }
      })
    })

    it('Add new address with filled fields', () => {
      cy.get("input[name=firstname]").type("Ekin");
      cy.get("input[name=lastname]").type("Karadag");
      cy.get("input[name=address_1]").type("Does not exist Street. No:0");
      cy.get("input[name=city]").type("Isparta");
      cy.get("input[name=postcode]").type("00000");
      cy.get("#input-country").select("Turkey");
      cy.get("#input-zone").select("Isparta");
      cy.get(".radio-inline").contains("Yes").click();

      cy.get("[value=Continue]").click()
      cy.visit('/index.php?route=account/address');
      cy.get("#content td.text-left").invoke("text").should($text => {
        expect($text).to.eq("Ekin KaradagDoes not exist Street. No:0Isparta 00000IspartaTurkey")
      })
    })
  })
})
