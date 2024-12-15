import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import todoSchema from "./schemas/todoschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: todo,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    reset(todo); // Reset the form fields with current todo values when toggling.
  };

  const handleDelete = async () => {
    await onDelete(todo._id);
  };

  const handleUpdate = async (data) => {
    await onUpdate(todo._id, data);
    setIsEditing(false);
    // TODO : Implement error handling and optimistic update
  };

  return (
    <Card className="mb-3 position-relative">
      {/* Edit Icon */}
      <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
        <PencilSquare
          style={{ cursor: "pointer", fontSize: "1.2rem" }}
          onClick={handleEditToggle}
        />
        <Trash
          style={{ cursor: "pointer", fontSize: "1.2rem", color: "red" }}
          onClick={handleDelete}
        />
      </div>
      <Card.Body>
        {isEditing ? (
          <Form onSubmit={handleSubmit(handleUpdate)}>
            {/* Title field */}
            <Form.Group className="mb-3">
              <Form.Label> Title </Form.Label>
              <Form.Control
                type="text"
                {...register("title")}
                isInvalid={!!errors.title}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            {/* Description Field */}
            <Form.Group className="mb-3">
              <Form.Label>Description </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description")}
                isInvalid={!!errors.description}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            {/* Save and cancel Buttons */}
            <Button variant="success" type="submit">
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={handleEditToggle}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
