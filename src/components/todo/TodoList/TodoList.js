import React, { useState, useEffect } from 'react';
// import { ListGroup } from 'react-bootstrap';
import api from '../../../api/axiosConfig';
import { toast } from 'react-toastify';
import TodoItem from '../TodoItem';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import Spinner from '../../common/spinner/Spinner';
import ConfirmDialog from '../../common/ConfirmDialog/ConfirmDialog';
import { Button } from 'react-bootstrap';
import GenericDialog from '../../common/GenericDialog/GenericDialog';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddTodoDialog, setshowAddTodoDialog] = useState(false);
  const [selectedTodoId, setselectedTodoId] = useState(false);

  useEffect(() => {
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

  const handleAddTodoDialogOpen = () => setshowAddTodoDialog(true);
  const handleAddTodoDialogClose = () => {
    setshowAddTodoDialog(false);
  }

  return (
    <div>
      {loading ? <Spinner /> : (
        <>
          <Button variant="primary" onClick={handleAddTodoDialogOpen}>
          </Button>
          <GenericDialog isOpen={showAddTodoDialog} onClose={handleAddTodoDialogClose}>
            <AddTodoForm onAddTodo={addTodo} />
          </GenericDialog>

          <h1>All todos</h1>
          <div className='todo-list-container'>
            {todos.map(todo => (
              <div key={todo._id}>
                <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
              </div>
            ))}
          </div>
          <ConfirmDialog
            show={showConfirm}
            handleClose={handleClose}
            handleConfirm={deleteTodo}
            title="Confirm Deletion"
          >
            Are you sure you want to delete this todo?
          </ConfirmDialog>
        </>
      )}
    </div>
  );
};

export default TodoList;