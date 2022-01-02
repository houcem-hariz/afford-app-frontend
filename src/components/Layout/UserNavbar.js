import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../redux/actions/userActionCreators'

export default function UserNavbar(props) {
    const user = props.info
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userNavbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                    {user.firstName}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-dark-custom" aria-labelledby="userNavbarDarkDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" onClick={() => {
                        localStorage.removeItem('user')
                        dispatch(logout())
                        history.push('/login')
                    }}>Logout</a></li>
                </ul>
            </li>
        </ul>
    )
}
