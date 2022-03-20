import React from 'react';
import PropTypes from 'prop-types';
import TodoList from "./todo/todo.js";
import Context from './context.js';
import AddTodo from './todo/AddTodo.js';


function App() {
  const [todos, setTodos] = React.useState([
    {id:1, completed: false, title: "Buy bread"},
    {id:2, completed: false, title: "Buy salt"},
    {id:3, completed: false, title: "Buy milk"}
  ])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo
      })
    )
  }

  function removeTodo(id){
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  function addTodo (title){
    setTodos(
      todos.concat([{
        title,
        id: Date.now(),
        completed: false
      }])
    )
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>Todo List</h1> 
        <AddTodo onCreate={addTodo}/>       
        {todos.length 
          ?<TodoList todos={todos} onToggle={toggleTodo}/> 
          : <p>No Todos!</p>}        
      </div>
    </Context.Provider>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default App;
