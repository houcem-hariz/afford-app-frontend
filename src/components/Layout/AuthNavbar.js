import React from 'react'
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserNavbar from './UserNavbar';

export default function AuthNavbar() {
    const { isAuth, info } = useSelector(state => state.user);
    return (
        !isAuth ? 
        <Nav>
            <NavLink className="nav-link" to={"/login"}>Login</NavLink>
            <NavLink className="nav-link" to={"/register"}>Register</NavLink>
        </Nav> : <Nav><UserNavbar info={info}/></Nav>
    )
}
