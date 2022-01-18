import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import AuthNavbar from './AuthNavbar';
import CustomNavbar from './CustomNavbar';

export default function HeaderNavbar() {
  return (
    <div className="navbar-custom">
      <Navbar collapseOnSelect variant='dark' expand="md" fixed="top">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <CustomNavbar />
            <hr />
            <AuthNavbar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
