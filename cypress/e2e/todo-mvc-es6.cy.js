import { selectors } from '../support/locators';

describe('TodoMVC ES6 App - Automated Testing', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('creates multiple todos, toggles them, and shows the completed todos', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    })

    // assert that the 3 todos are exsiting
    cy.get(selectors.todoItem).should('have.length', 3)

    // toggle the 3 created todos
    for (let i = 0; i < todos.length; i++) {
      cy.get(selectors.todoToggle(i + 1)).click()
    }

    // assert that the 3 newly created todos are completed
    cy.get(selectors.todoItem).each(($el) => {
      cy.wrap($el).should('have.class', 'completed')
    })

    // show the completed tab
    cy.window().then((win) => {
      win.location.hash = '/completed';
    });

    // assert that the toggled todos are showing in the completed tab
    cy.get(selectors.todoItem).should('have.length', 3)
  })

  it('creates 2 new todos, edits the first todo, toggles the first todo, and displays the active todos', () => {

    // 1. Create 2 todos
    const todos = ['Todo 1', 'Todo 2']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    })

    // 2. Edit the first todo
    //   - double-click the first todo label (Cypress has .dblclick)
    //   - clear and type a new value into the input (then press enter)
    //   - assert the first todo text has changed

    cy.get(`${selectors.todoItem} label`).first().dblclick();
    cy.get(selectors.editInput)
      .clear()
      .type('Todo 1 updated{enter}')

    cy.get(`${selectors.todoItem} label`)
      .first()
      .should('contain.text', 'Todo 1 updated')

    // 3. Toggle the first todo
    //   - click the toggle of the first todo
    //   - assert it has the class 'completed'

    // 4. Show only active todos
    //   - navigate to active todos (either click the filter button OR use win.location.hash = '/active')

    // 5. Assert only the 2nd todo shows in the list
    //   - should('have.length', 1)
    //   - and should('contain.text', 'Todo 2')





    
  })

});