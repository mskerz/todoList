import React, { useState, useRef } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
function App() {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(1); // useRef สำหรับเก็บค่า id แทน useState
  const addTodo = (todo) => {
    const newTodo = { id: idRef.current, todo }; // ใช้ idRef.current ในการสร้าง todo ใหม่
    setTodos([...todos, newTodo]);
    idRef.current += 1; // อัปเดต idRef.current ให้เพิ่มขึ้นทีละ 1
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center align-content-center">To-Do App</h2>
        {/* ตรวจสอบการส่ง prop addTodo ไปยัง AddTodo */}
        <AddTodo addTodo={addTodo} />
        {todos.length === 0 ? (
          <p className='text-center'>&nbsp;&nbsp;ไม่มีรายการที่ต้องทำ</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className='mt-1'>
              <Todo  id={todo.id} todo={todo.todo} onDelete={onDelete} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
