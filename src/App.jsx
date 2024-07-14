import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [allComplete,setAllComplete] = useState(false);
  const idRef = useRef(1); // useRef สำหรับเก็บค่า id แทน useState
  const addTodo = (todo) => {
    const newTodo = { id: idRef.current, todo }; // ใช้ idRef.current ในการสร้าง todo ใหม่
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
    idRef.current += 1; // อัปเดต idRef.current ให้เพิ่มขึ้นทีละ 1
  };

  const onDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };
  
  const handleAllComplete = () => {
    setAllComplete(!allComplete);
    if (!allComplete) {
      // ตั้งค่าให้ todos ทั้งหมดเป็น complete เมื่อทำการ check all
      sessionStorage.removeItem('todos')
      setTodos([]);
      idRef.current = 1;
       
    }
  };



  useEffect(() => {
    const storedTodos = JSON.parse(sessionStorage.getItem('todos')) || [];
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
      idRef.current = storedTodos[storedTodos.length - 1].id + 1; // ตั้งค่า idRef.current ให้เริ่มต้นจาก id ล่าสุด + 1
    }
  }, []);
  
  return (
    <>
      <div className="container mt-5">
        <h2 className="align-content-center">Simple Todo App</h2>
        {/* ตรวจสอบการส่ง prop addTodo ไปยัง AddTodo */}
        <AddTodo addTodo={addTodo} />
        {todos.length === 0 ? (
          <p className='fs-2 text-secondary'>&nbsp;&nbsp;You don&apos;t have todo</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className='mt-1'>
              <Todo  id={todo.id} todo={todo.todo} onDelete={onDelete} />
            </div>
          ))
        )}
      <div className="d-flex align-items-center p-2 mt-5" >
        <input
          type="checkbox"
          className="form-check-input me-1"
          checked={allComplete}
          onChange={handleAllComplete}
        />
        <span className="ms-2 form-check-label">All</span>
      </div>
      </div>
    </>
  );
}

export default App;
