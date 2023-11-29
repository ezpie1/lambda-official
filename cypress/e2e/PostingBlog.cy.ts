describe("Posting Blog", () => {
  it("Post should be added", () => {
    // Login the test user
    cy.LoginUser();

    // refresh the page to head back to the homepage
    cy.reload();

    // get the `New Post` button and click it
    cy.GetByTest("newPost").click();

    // get the input with id `content`
    cy.get("#content").type(
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, quisquam quasi! Repudiandae aliquam atque adipisci repellendus. Minima nihil, ullam odit veritatis voluptatem placeat esse maxime, odio in, aliquam perspiciatis. Aliquam."
    );

    // get the input with id `title`
    cy.get("#title").type("This is a test post");

    // submit the form to add a new post
    cy.GetByTest("submitBtn").click();
  });
});
