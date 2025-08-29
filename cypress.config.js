const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://todomvc.com/examples/javascript-es6/dist/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
