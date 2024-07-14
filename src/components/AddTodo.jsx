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
          <div className='d-flex flex-row align-items-center'>
          <input className='form-control '
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add new todo"
                style={{ maxWidth: '50%', borderRadius: 20 }} // กำหนด maxWidth เพื่อไม่ให้ input ยาวเกินไป

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
