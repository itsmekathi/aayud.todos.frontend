import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './AddTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onAddTodo({ title, description });
  };

  return (
    <div className="add-todo-form">
      <h1>Add todo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            style={{ resize: 'none' }}
            placeholder="Enter todo description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add todo
        </Button>
      </Form>
    </div>
  );
};

export default AddTodoForm;