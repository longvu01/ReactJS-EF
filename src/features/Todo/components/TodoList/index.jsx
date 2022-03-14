import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

// TodoList.propTypes = {
//   todoList: PropTypes.array,
//   onTodoClick: PropTypes.func,
// };

// TodoList.defaultProps = {
//   todoList: [],
//   onTodoClick: null,
// };

// function TodoList({ todoList, onTodoClick }) {
//   function handleTodoClick(index) {
//     if (!onTodoClick) return;

//     onTodoClick(index);
//   }

//   return (
//     <ul className="todo-list">
//       {todoList.map((todo, index) => (
//         <li
//           key={todo.id}
//           className={classnames({
//             'todo-item': true,
//             completed: todo.status === 'completed',
//           })}
//           onClick={() => handleTodoClick(index)}
//         >
//           {todo.title}
//         </li>
//       ))}
//     </ul>
//   );
// }

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList({ todoList, onTodoClick }) {
  function handleTodoClick(index) {
    if (!onTodoClick) return;

    onTodoClick(index);
  }

  return (
    <ul className="todo-list">
      {todoList.map((todo, index) => (
        <li key={todo.id} onClick={() => handleTodoClick(index)}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
