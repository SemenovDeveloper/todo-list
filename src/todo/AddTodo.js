import React, {useState} from "react";
import PropTypes from "prop-types"

function UseInputValue(defaultValue="") {
  const [value, setValue] = React.useState(defaultValue="");  
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(""),
    value: () => value
  }
}

function AddTodo ({onCreate}) {
  const input = UseInputValue("")
  function submitHandler(event) {
    event.preventDefault();
    if(input.value().trim()) {
      onCreate(input.value());
      input.clear()
    }
  }

  

  return(
    <form style={{marginBottom: "1rem"}} onSubmit={submitHandler}>
      <input {...input.bind}></input>
      <button type="submit">Add todo</button>
    </form>
  )
}

AddTodo.propTypes = { 
  onCreate: PropTypes.func.isRequired
}

export default AddTodo
