import React from 'react';
import Layout from './components/Layout';
import TodoList from './components/todo/TodoList/TodoList';
import EditTodoForm from './components/todo/EditToDoForm';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import useDocumentTitle from './components/common/hooks/useDocumentTitle';

const App = () => {
  useDocumentTitle('Home Page');
  // Create a router instance
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <TodoList />
        </Layout>
      ),
    },
    {
      path: "/edit/:todoId",
      element: (
        <Layout>
          <EditTodoForm />
        </Layout>
      ),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;