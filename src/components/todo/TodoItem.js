import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TodoItem = ({ todo, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the edit page with the todo ID
    navigate(`/edit/${todo._id}`)
  }
  const handleDelete = async () => {
    // OnDelete is a prop function that handles deletion.
    await onDelete(todo._id);
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>{todo.description}</Card.Text>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>{' '}
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;