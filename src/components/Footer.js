import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="light" variant="light">
      <Container>
        <div className="text-center w-100">
          © {new Date().getFullYear()} Aayud-Todo App. All rights reserved.
        </div>
      </Container>
    </Navbar>
  );
};

export default Footer;
