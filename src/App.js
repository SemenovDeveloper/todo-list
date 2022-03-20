import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import TodoList from "./todo/todo.js";
import Context from './context.js';
import Loader from './loader.js';
import Modal from './Modal.js';

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import("./todo/AddTodo.js")), 3000)
}))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())          
      .then(todos => setTimeout(() => {
        setTodos(todos);
        setLoader(false);
      }, 2000))
  }, [])

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
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
         <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        {loader && <Loader />}
        {todos.length 
          ?<TodoList todos={todos} onToggle={toggleTodo}/> 
          : loader ? null : <p>No Todos!</p>}        
      </div>
    </Context.Provider>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default App;
