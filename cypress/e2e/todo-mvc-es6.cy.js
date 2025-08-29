import {selectors} from '../support/locators';

describe('TodoMVC ES6 App - Automated Testing', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('creates a new todo and toggles newly created todo', () => {
    // creates a new todo
    cy.get(selectors.newTodoInput).type('Buy groceries{enter}');

    // asserts that the newly created to do is created
    cy.get(`${selectors.todoItem} label`)
      .first()
      .should('contain.text', 'Buy groceries');
    // end of creates a new todo

    // toggles the newly created todo above
    cy.get(selectors.todoToggle(1)).click();

    // asserts that the newly created todo was toggled
    cy.get(selectors.todoItem).first().should('have.class', 'completed')
  });

  

});