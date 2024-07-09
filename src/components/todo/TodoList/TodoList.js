import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import api from '../../../api/axiosConfig';
import TodoItem from '../TodoItem';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import Spinner from '../../common/spinner/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/todos`);
      setTodos(response.data);
      toast.success('Fetched todo successfully!');
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Error fetching data!');
    }
    setLoading(false);
  }

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/api/todos/${id}`);
      const response = await api.get(`/api/todos`);
      setTodos(response.data);
      toast.success('Deleted todo successfully!');
    } catch (error) {
      console.error("Failed to delete and fetch todos:", error);
      toast.error('Error updating todo and fetching data!');
    }
    setLoading(false);
  }

  const addTodo = async (todo) => {
    try {
      setLoading(true);
      await api.post(`/api/todos`, todo);
      await fetchTodos();
      toast.success('Added todo successfully!');
    }
    catch (error) {
      toast.error('Error adding todo and fetching data!');
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? <Spinner /> : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <div className='todo-list-container'>
            <h1>All todos</h1>
            <ListGroup>
              {todos.map(todo => (
                <ListGroup.Item key={todo._id}>
                  <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;