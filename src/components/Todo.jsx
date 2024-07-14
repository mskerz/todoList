import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import './Todo.css';


function Todo({ id, todo, onDelete }) {
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleCheckTask = () => {
    setIsComplete(!isComplete);
    
  };

  useEffect(() => {
    if (isComplete) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 500); // Delay before fading out

      const deleteTimer = setTimeout(() => {
        onDelete(id);
      }, 1000); // Total delay for both animations (0.5s + 1s)

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(deleteTimer);
      };
    }
  }, [isComplete, id, onDelete]);
  
  return (
    <div className={`d-flex justify-content-between align-items-center col-6 todo-item ${isFading ? 'fade-out' : ''}`}>
      
      <div className="d-flex align-items-center " style={{ textDecoration: isComplete ? "line-through" : "none" , }}>
        <input
          type="checkbox"
          className="form-check-input me-1"
          checked={isComplete}
          onChange={handleCheckTask}
        />
        <span className="ms-2">{todo}</span>
      </div>
      <button  className="btn btn-danger" onClick={() => onDelete(id)}> <i className="bi bi-trash"></i> </button>
    </div>
  );
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};
  

export default Todo;
