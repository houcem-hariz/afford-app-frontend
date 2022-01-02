import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import AuthNavbar from './AuthNavbar';
import CustomNavbar from './CustomNavbar';

export default function HeaderNavbar() {
  return (
    <div className="navbar-custom">
      <Navbar variant='dark' collapseOnSelect expand="md" fixed="top">
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
