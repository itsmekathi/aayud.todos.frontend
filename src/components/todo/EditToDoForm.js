import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../common/spinner/Spinner';
import useDocumentTitle from '../common/hooks/useDocumentTitle';


const EditTodoForm = () => {
  const { todoId } = useParams(); // Get todoId from the URL parameter 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log('todoId: ', todoId);

  useDocumentTitle('Edit to do item');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/todos/${todoId}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
      setLoading(false);
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const todo = { title, description };
      await api.put(`/api/todos/${todoId}`, todo);
      setLoading(false);
      toast.success('Updated todo successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Error updating todo!');
    }

  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (loading ? <Spinner /> :
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
      <Button variant="success" type="submit">
        Save Changes
      </Button>
      <Button variant="danger" onClick={handleCancel}>Cancel</Button>
    </Form>
  );
};

export default EditTodoForm;