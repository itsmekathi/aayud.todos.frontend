import { Form, Button } from "react-bootstrap";
import "./AddTodoForm.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import todoSchema from "../schemas/todoschema";

const AddTodoForm = ({ onAddTodo, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(todoSchema),
    // defaultValues: {
    //   title: "Enter title",
    //   description: "Enter description",
    // },
  });

  const onSubmit = async (data) => {
    console.log(`Form Submitted: ${data}`);
    await onAddTodo(data);
    onClose(); // Close the modal
  };

  return (
    <div className="add-todo-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo title"
            isInvalid={!!errors.title}
            {...register("title")}
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
            {...register("description")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Todo
        </Button>
        <Button variant="secondary" onClick={onClose} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AddTodoForm;
