import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
  // Data from API
  const todoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Code',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Sleep',
      status: 'new',
    },
  ];

  // Hooks
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [todoState, setTodoList] = useState(todoList);
  const [filterState, setFilterState] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterState(params.status || 'all');
  }, [location.search]);

  const handlerShowAllClick = () => {
    const queryParams = { status: 'all' };
    setSearchParams(queryParams);
  };

  const handlerShowCompleted = () => {
    const queryParams = { status: 'completed' };
    setSearchParams(queryParams);
  };

  const handlerShowNewClick = () => {
    const queryParams = { status: 'new' };
    setSearchParams(queryParams);
  };

  const renderedTodoList = todoState.filter(
    (todo) => filterState === 'all' || todo.status === filterState
  );

  const handleTodoFormSubmit = (values) => {
    console.log(values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What to do?</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} />
      <div>
        <button onClick={handlerShowAllClick}>Show all</button>
        <button onClick={handlerShowCompleted}>Show completed</button>
        <button onClick={handlerShowNewClick}>Show new</button>
      </div>
    </div>
  );
}

export default ListPage;
