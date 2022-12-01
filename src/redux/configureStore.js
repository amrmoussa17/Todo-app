import { createStore, combineReducers } from "redux"
import { todosReducer } from "./ducks/todos"

const reducer = combineReducers({
  todos: todosReducer,
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
