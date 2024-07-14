import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import './Todo.css';


function Todo({ id, todo, onDelete }) {
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);

  console.log(id);
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
    <div className={`d-flex justify-content-between align-items-center todo-item ${isFading ? 'fade-out' : ''}`}>
      <div className="d-flex align-items-center" style={{ textDecoration: isComplete ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={handleCheckTask}
        />
        <span className="ms-2">{todo}</span>
      </div>
      <button className="btn-close ml-auto" onClick={() => onDelete(id)}></button>
    </div>
  );
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};
  

export default Todo;
