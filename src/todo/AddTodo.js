import React, {useState} from "react";
import PropTypes from "prop-types"

function AddTodo ({onCreate}) {
  const [value, setValue] = React.useState("");  

  function submitHandler(event) {
    event.preventDefault();
    if(value.trim()) {
      onCreate(value);
      setValue("")
    }
  }

  

  return(
    <form style={{marginBottom: "1rem"}} onSubmit={submitHandler}>
      <input onChange={event => setValue(event.target.value)}></input>
      <button value={value} type="submit">Add todo</button>
    </form>
  )
}

AddTodo.propTypes = { 
  onCreate: PropTypes.func.isRequired
}

export default AddTodo
