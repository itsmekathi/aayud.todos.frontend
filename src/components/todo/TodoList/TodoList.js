import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import api from '../../../api/axiosConfig';
import { toast } from 'react-toastify';
import TodoItem from '../TodoItem';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import Spinner from '../../common/spinner/Spinner';
import ConfirmDialog from '../../common/ConfirmDialog/ConfirmDialog';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTodoId, setselectedTodoId] = useState(false);

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

  const deleteTodo = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/todos/${selectedTodoId}`);
      const response = await api.get(`/api/todos`);
      setTodos(response.data);
      toast.success('Deleted todo successfully!');
    } catch (error) {
      console.error("Failed to delete and fetch todos:", error);
      toast.error('Error updating todo and fetching data!');
    }
    setShowConfirm(false);
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

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleDelete = (todoId) => {
    setselectedTodoId(todoId);
    setShowConfirm(true);
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
                  <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ConfirmDialog
              show={showConfirm}
              handleClose={handleClose}
              handleConfirm={deleteTodo}
              title="Confirm Deletion"
            >
              Are you sure you want to delete this todo?
            </ConfirmDialog>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;