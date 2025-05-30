describe("Multi-step form E2E test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/step1");
  });

  it("completes full form flow and submits", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.contains("Next").click();
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="preferences"]').type("football and reading");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/step3");

    cy.get('div[role="worker-card"]').should("have.length.greaterThan", 0);
    cy.get('div[role="worker-card"]').first().click();

    cy.get("button").contains("Next").click();

    cy.url().should("include", "/step4");
    cy.contains("Review Your Data");

    cy.get('button[aria-label="Submit form"]').click();

    cy.contains("Confirm Submission");
    cy.get("button").contains("Save and Add Another").click();

    cy.url().should("include", "/step1");
  });

  it("completes full form flow and submits with maritalStatus Married and adding a dependant", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.contains("Married").click();
    cy.contains("Next").click();
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="preferences"]').type("football and reading");
    cy.get('input[name="preferences"]').type("football and reading");
    cy.get('input[name="spouseName"]').type("Rema Doe");

    cy.contains("+ Add Dependent").click();
    cy.get('input[name="dependents.0.name"]').type("Spencer Doe");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/step3");

    cy.get('div[role="worker-card"]').should("have.length.greaterThan", 0);
    cy.get('div[role="worker-card"]').first().click();

    cy.get("button").contains("Next").click();

    cy.url().should("include", "/step4");
    cy.contains("Review Your Data");

    cy.get('button[aria-label="Submit form"]').click();

    cy.contains("Confirm Submission");
    cy.get("button").contains("Save and Add Another").click();

    cy.url().should("include", "/step1");
  });

  it("submits and redirects to user table instead of starting over", () => {
    cy.get('input[name="name"]').type("Alice Test");
    cy.get('input[name="email"]').type("Alice@example.com");
    cy.contains("Next").click();
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="preferences"]').type("football");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/step3");

    cy.get('div[role="worker-card"]').should("have.length.greaterThan", 0);
    cy.get('div[role="worker-card"]').first().click();

    cy.get("button").contains("Next").click();

    cy.url().should("include", "/step4");
    cy.contains("Review Your Data");

    cy.get('button[aria-label="Submit form"]').click();

    cy.contains("Confirm Submission");
    cy.get("button").contains("Submit to Table").click();

    cy.url().should("include", "/users");
    cy.contains("Alice Test");
  });
});
