import api from "../../api/axiosConfig";

const todoService = {
  // Fetch all todos
  getTodos: async () => {
    try {
      const response = await api.get(`/api/todos`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  // Fetch a single todo by ID
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/api/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (todo) => {
    try {
      const response = await api.post(`/api/todos`, todo);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  // Update an existing todo
  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await api.put(`/api/todos/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/api/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo with ID ${id}:`, error);
      throw error;
    }
  },
};

export default todoService;
