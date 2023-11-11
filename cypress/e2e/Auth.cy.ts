/// <reference types="cypress"/>

describe("Authentication Tests", () => {
  it("Creating user", () => {
    // Intercept the supabase POST request to check weather the response
    // status code is 200 or not
    cy.intercept(
      "http://127.0.0.1:54321/auth/v1/signup?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback"
    ).as("SignupResponse");

    cy.visit("/signup");

    // get input field with id `username` and type `tester` as username
    cy.get("#username").type("tester");

    // The value of the `username` field keeps disappearing, to prevent that
    // the wait command is being used to allow the app to process the input
    cy.wait(1000);

    // get input field with id `email` and type `tester@test.com` as email
    cy.get("#email").type("tester@test.com");

    // get input field with id `password` and type `test1234` as password
    cy.get("#password").type("test1234");

    // check if all field's have their values and hasn't disappeared
    cy.get("#username").should("have.value", "tester");
    cy.get("#email").should("have.value", "tester@test.com");
    cy.get("#password").should("have.value", "test1234");

    // submit the form
    cy.get("form").submit();

    // Check if the response status code is 200 or not
    cy.wait("@SignupResponse").its("response.statusCode").should("eq", 200);
  });

  it.only("Logging in user", () => {
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
    cy.get("#password").should("have.value", "test1234");

    // submit form to login user
    cy.get("form").submit();

    // check if the response status code is 200
    cy.wait("@LoginResponse").its("response.statusCode").should("eq", 200);
  });
});
