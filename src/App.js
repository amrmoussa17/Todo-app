import "./css/App.css"
import iconMoon from "./images/icon-moon.svg"
import iconSun from "./images/icon-sun.svg"
import iconCheck from "./images/icon-check.svg"
import iconCross from "./images/icon-cross.svg"
import desktopLight from "./images/bg-desktop-light.jpg"
import desktopDark from "./images/bg-desktop-dark.jpg"

import { useState } from "react"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
} from "./redux/ducks/todos"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [input, setInput] = useState("")

  const [filter, setFilter] = useState("all")
  const [darkTheme, setDarkTheme] = useState(false)

  const todos = useSelector((state) => state.todos)
  const activeItems = todos.filter((todo) => !todo.completed)
  let showingTodos

  if (filter === "active") {
    showingTodos = todos.filter((todo) => !todo.completed)
  }
  if (filter === "completed") {
    showingTodos = todos.filter((todo) => todo.completed)
  }
  if (filter === "all") {
    showingTodos = todos
  }
  function showByFilter(e, filter) {
    const filters = document.querySelectorAll(".filter-control div span")
    setFilter(filter)
    filters.forEach((item) => {
      item.classList.remove("active")
    })
    e.target.classList.add("active")
  }

  const dispatch = useDispatch()
  function addItem() {
    if (input) {
      dispatch(
        addTodo({
          id: uuidv4(),
          name: input,
          completed: false,
        })
      )
    }
  }
  function toggleItem(id) {
    dispatch(toggleTodo(id))
  }
  function removeItem(id) {
    dispatch(removeTodo(id))
  }
  function clearCompletedItems() {
    dispatch(clearCompleted())
  }
  function ChangeDarkTheme() {
    setDarkTheme(true)
    document.querySelector("body").style.backgroundColor = "hsl(235, 21%, 11%)"
  }
  function ChangeLightTheme() {
    setDarkTheme(false)
    document.querySelector("body").style.backgroundColor = "white"
  }

  return (
    <div>
      <header
        style={{
          backgroundImage: darkTheme
            ? `url(${desktopDark})`
            : `url(${desktopLight})`,
        }}
      >
        <div className="container">
          <div className="content">
            <div className="logo-head">
              <p>todo</p>
              {!darkTheme && (
                <img
                  src={iconMoon}
                  className="toggle-theme"
                  alt="img"
                  onClick={ChangeDarkTheme}
                />
              )}
              {darkTheme && (
                <img
                  src={iconSun}
                  className="toggle-theme"
                  alt="img"
                  onClick={ChangeLightTheme}
                />
              )}
            </div>
            <div className="input-head">
              <div
                className="checkbox"
                onClick={() => addItem()}
                style={{
                  borderColor: darkTheme
                    ? "hsl(237, 14%, 26%)"
                    : "hsl(236, 33%, 92%)",
                }}
              ></div>
              <input
                placeholder="Create a new todo..."
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addItem()
                    setInput("")
                  }
                }}
                style={{
                  backgroundColor: darkTheme ? "hsl(235, 24%, 19%)" : "white",
                  color: darkTheme ? "hsl(236, 33%, 92%)" : "black",
                }}
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div
            className="content"
            style={{
              backgroundColor: darkTheme ? "hsl(235, 24%, 19%)" : "white",
              border: darkTheme ? "none" : "1px solid hsl(236, 33%, 92%)",
            }}
          >
            <ul>
              {showingTodos.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    textDecorationLine: todo.completed
                      ? "line-through"
                      : "none",
                    textDecorationColor: darkTheme
                      ? " hsl(233, 14%, 35%)"
                      : "black",
                    borderBottom: darkTheme
                      ? "1px solid hsl(237, 14%, 26%)"
                      : "1px solid hsl(236, 33%, 92%)",
                  }}
                >
                  <div
                    className="checkbox"
                    onClick={(e) => toggleItem(todo.id)}
                    style={{
                      backgroundImage: todo.completed
                        ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                        : "none",
                      borderColor: darkTheme
                        ? "hsl(237, 14%, 26%)"
                        : "hsl(236, 33%, 92%)",
                    }}
                  >
                    <img
                      style={{ display: todo.completed ? "block" : "none" }}
                      src={iconCheck}
                      alt="img"
                    />
                  </div>
                  {darkTheme && (
                    <p
                      style={{
                        color: !todo.completed
                          ? "hsl(236, 33%, 92%)"
                          : "hsl(233, 14%, 35%)",
                      }}
                    >
                      {todo.name}
                    </p>
                  )}
                  {!darkTheme && <p> {todo.name} </p>}
                  <div
                    className="close-button"
                    onClick={() => removeItem(todo.id)}
                  >
                    <img src={iconCross} alt="img" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="filter-control">
              <span>{activeItems.length} items left</span>
              <div>
                <span
                  className="active"
                  onClick={(e) => showByFilter(e, "all")}
                >
                  All
                </span>
                <span onClick={(e) => showByFilter(e, "active")}>Active</span>
                <span onClick={(e) => showByFilter(e, "completed")}>
                  Completed
                </span>
              </div>
              <span onClick={clearCompletedItems}>Clear Completed</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
