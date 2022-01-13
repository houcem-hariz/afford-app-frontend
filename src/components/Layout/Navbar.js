import React, { useContext } from 'react'
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { ThemeContext } from '../../context/ThemeProvider';
import ToggleThemeButton from '../ToggleThemeButton';
import AuthNavbar from './AuthNavbar';
import CustomNavbar from './CustomNavbar';

export default function HeaderNavbar() {

  const [navbarTheme, setNavbarTheme] = useState('light')

  const handleToggleTheme = (theme) => {
    setNavbarTheme(theme)
  }

  return (
    <div className={`navbar-custom-${navbarTheme}`}>
      <Navbar variant='dark' collapseOnSelect expand="md" fixed="top">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <CustomNavbar />
            <hr />
            <Nav><ToggleThemeButton handleToggleTheme={handleToggleTheme}/></Nav>
            <AuthNavbar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
