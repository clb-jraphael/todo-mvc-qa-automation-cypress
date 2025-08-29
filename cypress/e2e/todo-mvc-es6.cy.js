import {selectors} from '../support/locators';

describe('TodoMVC ES6 App - Automated Testing', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('creates multiple todos and toggles them', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];

    todos.forEach( (todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    })

    // assert that the 3 todos are exsiting

    // toggle the 3 created todos

    // assert that the 3 newly created todos are toggled 

  })

});