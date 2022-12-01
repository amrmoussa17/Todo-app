const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const CLEAR_COMPLETED = "CLEAR_COMPLETED"
export const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
})
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
})
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
})
export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
})

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed)
    default:
      return state
  }
}
