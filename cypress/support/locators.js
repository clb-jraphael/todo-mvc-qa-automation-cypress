export const selectors = {
  // Input box at the top for adding new todos
  newTodoInput: 'header .new-todo',

  // Each todo list item (<li>) inside the <ul.todo-list>
  todoItem: 'ul.todo-list li',

  // Checkbox toggle for a specific todo (nth-child based on index)
  todoToggle: (n) => `ul.todo-list li:nth-child(${n}) .toggle`,

  // Input field that appears when editing a todo
  editInput: 'ul.todo-list li.editing .edit',

  // Label for the "toggle all" control (clicking this toggles all todos)
  toggleAllLabel: 'label[for="toggle-all-label"]',

  // Delete button for a specific todo (nth-child based on index)
  todoDestroy: (n) => `ul.todo-list li:nth-child(${n}) .destroy`,

  // The hidden checkbox used to toggle all todos at once
  toggleAll: 'input.toggle-all',
};
