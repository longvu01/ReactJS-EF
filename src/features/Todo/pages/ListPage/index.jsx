import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
  // Data from API
  const todoListDump = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Learn',
      status: 'new',
    },
    {
      id: 3,
      title: 'Code',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Sleep',
      status: 'new',
    },
  ];

  // Hooks
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [todoList, setTodoList] = useState(todoListDump);
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterStatus(params.status || 'all');
  }, [location.search]);

  const renderedTodoList = todoList.filter(
    (todo) => filterStatus === 'all' || todo.status === filterStatus
  );

  // Handlers
  const handleChangeStatus = (status) => {
    const queryParams = { status };
    setSearchParams(queryParams);
  };

  const handleTodoClick = (index) => {
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };

    setTodoList(newTodoList);
  };

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: new Date().toISOString(),
      title: values.title,
      status: 'new',
    };

    const newTodoList = [newTodo, ...todoList];

    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What to do?</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleChangeStatus.bind(null, 'all')}>Show all</button>
        <button onClick={handleChangeStatus.bind(null, 'completed')}>
          Show completed
        </button>
        <button onClick={handleChangeStatus.bind(null, 'new')}>Show new</button>
      </div>
    </div>
  );
}

export default ListPage;
