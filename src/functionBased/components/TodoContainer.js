import React, { useState, useEffect } from 'react';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import NotMatch from '../pages/NoMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };

  const addTodoItem = (title) => {
    console.log(todos);
    const newTodo = {
      id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };
  // useEffect(() => {
  //   console.log('test run');
  //   const temp = localStorage.getItem('todos');
  //   const loadedTodos = JSON.parse(temp);

  //   if (loadedTodos) {
  //     setTodos(loadedTodos);
  //   }
  // }, [setTodos]);
  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }
  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodosList
                  todos={todos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  setUpdate={setUpdate}
                />
              </div>
            </div>
          }
        />
        <Route exact path="/about/*" element={<About />} />
        <Route exact path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
};

export default TodoContainer;

// our-domain.com/ => Component A
// our-domain.com/products => Component B
