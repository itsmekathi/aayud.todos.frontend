import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Todo App Logo"
            src="/tododo.png"  // Assuming your logo file is named logo.png
            width="75"       // Set the width as needed
            height="50"      // Set the height as needed
            className="d-inline-block align-top"  // Bootstrap class to align the image with text
          />
          Todo App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;