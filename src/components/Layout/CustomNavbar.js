import React from 'react'
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function CustomNavbar() {
    const { isAuth } = useSelector(state => state.user);
    return (
        isAuth ?
            <Nav className="me-auto">
                <NavLink className="nav-link" to={"/stores"}>Stores</NavLink>
                <NavLink className="nav-link" to={"/categories"}>Categories</NavLink>
                <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                <NavLink className="nav-link disabled" to={"/users"}>Users</NavLink>
            </Nav> : <Nav className="me-auto"></Nav>
    )
}
