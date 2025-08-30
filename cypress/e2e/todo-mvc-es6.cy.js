import { selectors } from '../support/locators';

describe('TodoMVC ES6 App - Automated Testing', () => {

  beforeEach(() => {
    cy.visit('/');
  });



  // -- CREATE TODOS --
  it('Creates new todos', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    // -- ASSERTS NEW TODOS ARE CREATED --
    cy.get(selectors.todoItem).should('have.length', 3)
  })



  // -- TOGGLE A TODO
  it.only('Toggles a to do', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    // -- ASSERTS NEW TODOS ARE CREATED --
    cy.get(selectors.todoItem).should('have.length', 3)

    // -- TOGGLES A TODO -- 
    cy.get(selectors.todoToggle(1)).click()

    // -- ASSERT FIRST TODO TO BE COMPLETED
    cy.get(selectors.todoItem)
      .first()
      .should('have.class', 'completed')
    
    // -- TOGGLES BACK THE TODO -- 
    cy.get(selectors.todoToggle(1)).click()

    // -- ASSERT THE TODO TO BE ACTIVE
    cy.get(selectors.todoItem)
      .first()
      .should('not.have.class', 'active')
  })



  // -- EDIT TODOS -- 
  it('Edit todos', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    cy.get(`${selectors.todoItem} label`).first().dblclick();
    cy.get(selectors.editInput)
      .clear()
      .type('Ammended 1st todo{enter}')

    // -- ASSERTS 1ST TODO AMMENDED
    cy.get(`${selectors.todoItem} label`)
      .first()
      .should('contain.text', 'Ammended 1st todo')
  })



  // -- DELETE TODOS --
  it('Destroy a todo', () => {
    const todos = ['Todo 1', 'Todo 2', 'Todo 3']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    cy.get(selectors.todoItem)
      .first()
      .trigger('mouseover')
      .find('button.destroy')
      .click({ force: true });

    // -- ASSERTS THAT 1ST TODO IS DESTROYED
    cy.get(selectors.todoItem).should('have.length', 2);
  })



  // -- MARK ALL AS DONE --
  it('Mark all todos as done', () => {
    const todos = ['Todo 1', 'Todo 2', 'Todo 3']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    cy.get(selectors.toggleAll).click({ force: true })

    // -- ASSERTS ALL TODOS ARE COMPLETED -- 
    // Optional: assert that all todos are marked done
    cy.get(selectors.todoItem).each(($el) => {
      cy.wrap($el).should('have.class', 'completed')
    })
  })



  // -- CHECK IF COMPLETED TABS IS WORKING --
  it('Showing completed, active, and all todos', () => {
    const todos = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`)
    })

    // toggle only the first 3 todos as done
    for (let i = 1; i <= 3; i++) {
      cy.get(selectors.todoToggle(i)).click()
    }

    // -- ASSERT THAT ONLY THE FIRST 3 ARE COMPLETED --
    cy.get(selectors.todoItem).each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).should('have.class', 'completed')      
      } else {
        cy.wrap($el).should('not.have.class', 'completed')  
      }
    })

    // -- NAVIGATE TO COMPLETED TAB --
    cy.window().then((win) => {
      win.location.hash = '/completed';
    });

    // -- ASSERT THAT THERE ARE ONLY 3 TODOS COMPLETED -- 
    cy.get(selectors.todoItem).should('have.length', 3)

    // -- NAVIGATE TO ALL TAB --
    cy.window().then((win) => {
      win.location.hash = '/';
    });

    // -- ASSERT THERE ARE 5 TODOS -- 
    cy.get(selectors.todoItem).should('have.length', 5)

    // -- NAVIGATE TO ACTIVE TAB --
    cy.window().then((win) => {
      win.location.hash = '/active';
    });

    // -- ASSERT THERE ARE 2 TODOS --
    cy.get(selectors.todoItem).should('have.length', 2)
  })



  it('creates multiple todos, marks them as completed, and verifies they appear in the Completed view', () => {

    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];

    // 1. create 3 todos
    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    })

    // 2. Assert that 3 todos exist
    cy.get(selectors.todoItem).should('have.length', 3)

    // 3. Toggle each of the created todos
    for (let i = 0; i < todos.length; i++) {
      cy.get(selectors.todoToggle(i + 1)).click()
    }

    // 4. Assert that all todos are completed
    cy.get(selectors.todoItem).each(($el) => {
      cy.wrap($el).should('have.class', 'completed')
    })

    // 5. Navigate to the completed tab
    cy.window().then((win) => {
      win.location.hash = '/completed';
    });

    // 6. Assert that all completed todos are displayed
    cy.get(selectors.todoItem).should('have.length', 3)
  })

  it('creates two todos, edits the first one, marks it as completed, and verifies only the active todo remains', () => {

    // 1. Create 2 todos
    const todos = ['Todo 1', 'Todo 2']

    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    })

    // 2. Edit the first todo
    cy.get(`${selectors.todoItem} label`).first().dblclick();
    cy.get(selectors.editInput)
      .clear()
      .type('Todo 1 updated{enter}')

    cy.get(`${selectors.todoItem} label`)
      .first()
      .should('contain.text', 'Todo 1 updated')

    // 3. Toggle the first todo as completed
    cy.get(selectors.todoToggle(1)).click()

    // 4. Show only active todos
    cy.window().then((win) => {
      win.location.hash = '/active';
    });

    // 5. Assert only the 2nd todo shows in the list
    cy.get(selectors.todoItem).should('have.length', 1)
  })

  it('creates three todos, deletes the first, toggles the next, and verifies filtering and toggle-all functionality', () => {
    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];

    // 1. Create 3 todos
    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    });

    // 2. Assert that 2 todos exist
    cy.get(selectors.todoItem).should('have.length', 3);

    // 3. Delete the first todo
    cy.get(selectors.todoItem).first().trigger('mouseover').find('button.destroy').click({ force: true });

    // 4. Assert that only 2 todos remain
    cy.get(selectors.todoItem).should('have.length', 2);

    // 5. Toggle the new first todo
    cy.get(selectors.todoToggle(1)).click();
    cy.get(selectors.todoItem).first().should('have.class', 'completed');

    // 6. Navigate to Completed tab using hash
    cy.window().then((win) => {
      win.location.hash = '/completed';
    });
    cy.get(selectors.todoItem).should('have.length', 1);

    // 7. Navigate back to All tab
    cy.window().then((win) => {
      win.location.hash = '/';
    });

    // 8. Toggle all todos using the label
    cy.get('label[for="toggle-all"]').click();

    // 9. Assert that all todos are completed
    cy.get(selectors.todoItem).each(($el) => {
      cy.wrap($el).should('have.class', 'completed');
    });
  })
});