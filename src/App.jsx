import React, { useState } from 'react'
import './App.css'
import Input from './components/Input'
import List from './components/List'

function App() {
  const [todos, setTodos] = useState({});
  console.log(todos);

  function addTodo(todo) {
    setTodos(prevTodos => ({
      ...prevTodos,
      [todo.id]: todo
    }));
   
    console.log("addTodo:", todo);
  }

  function rmvTodo(id) {
    const newTodos = { ...todos };
    delete newTodos[id];
    setTodos(newTodos);
  }

  function updateTodo(id, updatedTodo) {
    setTodos(prevTodos => ({
      ...prevTodos,
      [id]: {
        ...prevTodos[id], // preserve other properties of the todo item
        ...updatedTodo // update only the properties that have changed
      }
    }));
  }

  return (
    <>
      <Input onData={addTodo} />
      <List list={Object.values(todos)} onRemove={rmvTodo} onUpdate={updateTodo} />

    </>
  )
}

export default App
