export const selectors = {
    newTodoInput: 'header .new-todo',
    todoItem: 'ul.todo-list li',
    todoToggle: (n) => `ul.todo-list li:nth-child(${n}) .toggle`,
    editInput: 'ul.todo-list li.editing .edit',

}