import React, { useState, useEffect } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import TodoItem from "../TodoItem";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import Spinner from "../../common/spinner/Spinner";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";
import "./TodoList.css";
import todoService from "../todo.service";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTodoId, setselectedTodoId] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);

  console.log("Rendering TodoList component");
  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
      toast.success("Fetched todo successfully!");
    } catch (error) {
      toast.error("Error fetching data!");
    }
    setLoading(false);
  };

  const addTodo = async (todo) => {
    try {
      setLoading(true);
      todoService.createTodo(todo);
      toast.success("Added todo successfully!");
      await fetchTodos();
    } catch (error) {
      toast.error("Error adding todo and fetching data!");
    }
    setLoading(false);
  };

  const updateTodo = async (todoId, todo) => {
    try {
      setLoading(true);
      await todoService.updateTodo(todoId, todo);
      toast.success("Updated todo successfully!");
      await fetchTodos();
    } catch (error) {
      toast.error("Error updating todo and fetching data!");
    }
    setLoading(false);
  };

  const deleteTodo = async () => {
    try {
      setLoading(true);
      await todoService.deleteTodo(selectedTodoId);
      toast.success("Deleted todo successfully!");
      await fetchTodos();
    } catch (error) {
      toast.error("Error updating todo and fetching data!");
    }
    setShowConfirm(false);
    setLoading(false);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleAddTodoModalClose = () => {
    setShowAddTodoModal(false);
  };

  const handleAddTodoModalOpen = () => {
    setShowAddTodoModal(true);
  };

  const handleDelete = (todoId) => {
    setselectedTodoId(todoId);
    setShowConfirm(true);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <AddTodoForm onAddTodo={addTodo} /> */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={handleAddTodoModalOpen}>
              <i className="bi bi-plus"></i>Add Todo
            </Button>
          </div>
          <div className="todo-list-container">
            <h1>All todos</h1>
            <div className="d-flex flex-wrap justify-content-between align-items-stretch">
              {todos.map((todo) => (
                <div className="p-2" key={todo._id} style={{ flex: "1 0 30%" }}>
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={handleDelete}
                    onUpdate={updateTodo}
                  />
                </div>
              ))}
            </div>

            {/* Modal for Adding Todo */}
            <Modal
              show={showAddTodoModal}
              onHide={handleAddTodoModalClose}
              className="modal-pop"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Todo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddTodoForm
                  onAddTodo={addTodo}
                  onClose={handleAddTodoModalClose}
                />
              </Modal.Body>
            </Modal>

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
