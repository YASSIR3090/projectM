import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <i className="bi bi-box-seam me-2"></i>
            Global Track Cargo
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" onClick={() => setShowOffcanvas(true)} />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/services">Services</Nav.Link>
              <Nav.Link as={Link} to="/track">
                <i className="bi bi-search me-1"></i>Track
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="btn btn-primary text-white px-4 rounded-pill ms-2">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">
            <i className="bi bi-box-seam me-2"></i>
            Global Track
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={() => setShowOffcanvas(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setShowOffcanvas(false)}>About</Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={() => setShowOffcanvas(false)}>Services</Nav.Link>
            <Nav.Link as={Link} to="/track" onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-search me-1"></i>Track
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShowOffcanvas(false)}>
              <Button variant="primary" className="w-100 mt-2 rounded-pill">
                Contact Us
              </Button>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MainNavbar;
