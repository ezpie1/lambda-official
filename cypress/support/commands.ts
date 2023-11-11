/// <reference types="cypress" />

// declarations used for type safety
declare namespace Cypress {
  interface Chainable {
    LoginUser(): Chainable<JQuery<HTMLElement>>;
    GetByTest(testAttribute: string): Chainable<JQuery<HTMLElement>>;
  }
}

// Used for logging in the test user `tester`
Cypress.Commands.add("LoginUser", () => {
  // intercept the login response
  cy.intercept("http://127.0.0.1:54321/auth/v1/token?grant_type=password").as(
    "LoginResponse"
  );

  cy.visit("/login");

  // get input field with id `email` and type `tester@test.com` as email
  cy.get("#email").type("tester@test.com");

  // get input field with id `password` and type `test1234` as password
  cy.get("#password").type("test1234");

  // check if all field's have their values and hasn't disappeared
  cy.get("#email").should("have.value", "tester@test.com");

  // wait for the app to process data
  cy.wait(1000);

  cy.get("#password").should("have.value", "test1234");

  // submit form to login user
  cy.get("form").submit();

  // wait for the process to happen
  cy.wait(1000);

  // check if the response status code is 200
  cy.wait("@LoginResponse").its("response.statusCode").should("eq", 200);
});

// used for getting html tags with the `test-data` attribute
Cypress.Commands.add("GetByTest", (selector) => {
  return cy.get(`[test-data=${selector}]`);
});
