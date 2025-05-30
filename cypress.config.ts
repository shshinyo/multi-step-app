import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "src/tests/cypress/e2e/**/*.cy.{js,ts,jsx,tsx}", // must include .cy.ts
    baseUrl: "http://localhost:3000", // optional but useful
  },
});
