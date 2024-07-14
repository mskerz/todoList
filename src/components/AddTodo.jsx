import React, { useState } from 'react';
import PropTypes from "prop-types";
function AddTodo({ addTodo }) {
  const [todo,setTodo]= useState('');

  const handleSubmit =(event)=>{
    event.preventDefault();
    if (todo.trim()) {
        addTodo(todo);
        setTodo('');
    }
  }
  return (
    <>
        <form onSubmit={handleSubmit}>
          <div className='d-flex flex-row'>
          <input className='form-control'
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add new todo"
            />
            &nbsp;
            <button type="submit" style={{borderRadius:20}}><i className="bi bi-plus"></i></button>
          </div>
   
        </form>
    </>
  )
}
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default AddTodo;
