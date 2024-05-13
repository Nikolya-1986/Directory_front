describe('App component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })

    it('render title', () => {
        cy.contains('Directory')
    })

    it("Fields name, email, phone and isFavorite must be filled", () => {
        cy.get("input[formControlName='name']").type("Name")
        cy.get("input[formControlName='email']").type("Email")
        cy.get("input[formControlName='phone']").type("Phone")
        cy.get("input[formControlName='isFavorite']").type("Favorite")
        cy.get('button[type="submit"]').click()
        cy.get("ul").find("li > span").should("contain", "Name")
        cy.get("ul").find("li > div > span > span").should("contain", "Email")
        cy.get("ul").find("li > div > span > span").should("contain", "Phone")
    });

    it("Contact must be deleted", () => {
        cy.get("ul > li").eq(1).find("a").click()
        cy.get("ul > li").eq(1).find("div > button").find('button[class="btn-deleted"]').click()
        cy.get("ul > li").eq(1).should("not.exist")
    });

    it("Contact must be updated", () => {
        cy.get("ul > li").eq(1).find("a").click()
        cy.get("ul > li").eq(1).find("div > button").find('button[class="btn-updated"]').click()
        cy.get("ul > li").eq(1).should("update")
    });
})