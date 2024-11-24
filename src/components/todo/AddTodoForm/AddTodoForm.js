import { Form, Button } from "react-bootstrap";
import "./AddTodoForm.css";
import { useForm } from "react-hook-form";

const AddTodoForm = ({ onAddTodo }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(`Form Submitted: ${data}`);
    await onAddTodo(data);
  };

  return (
    <div className="add-todo-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add todo</h1>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo title"
            isInvalid={!!errors.title}
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 5,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            style={{ resize: "none" }}
            placeholder="Enter description"
            isInvalid={!!errors.description}
            {...register("description", {
              required: "Description is required.",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Todo
        </Button>
      </Form>
    </div>
  );
};

export default AddTodoForm;
