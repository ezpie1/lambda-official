describe("Posting Blog", () => {
  it("Post should be added", () => {
    // Login the test user
    cy.LoginUser();

    // refresh the page to head back to the homepage
    cy.reload();

    // get the input field with `test-data` as `blogTitle`
    cy.GetByTest("blogTitle").type("Test blog");

    // get the input field with `test-data` as `blogContent`
    cy.GetByTest("blogContent").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et commodo velit. Sed a lorem sit amet turpis pretium aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus"
    );

    // get the post button and click it
    cy.GetByTest("blogPostBtn").click();

    // get the posts list
    cy.GetByTest("posts")
      .first()
      .find("[test-data=postTitle]")
      .should("have.text", "Test blog");
  });
});
