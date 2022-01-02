import { useState } from 'react';
import axios from 'axios';

import Form from '../components/Form';
import Input from '../components/Input';

import { alertError, alertSuccess } from '../utils/feedback';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory()
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(login());
        console.log(registerData);
        const {firstName, lastName, email, password, confirmPassword} = registerData
        if (!firstName) {
            return alertError('First name is required')
        }
        if (!lastName) {
            return alertError('Last name is required')
        }
        if (!email) {
            return alertError('Email is required')
        }
        if (!password) {
            return alertError('Password is required')
        }
        if (!confirmPassword) {
            return alertError('You have to confirm your password')
        }
        if (password !== confirmPassword) {
            return alertError('Passwords mismatch')
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { firstName, lastName, email, password })
            console.log({res});
            if (res.data && res.data.message && res.data.user && res.data.token) {
                alertSuccess(res.data.message)
                // localStorage.setItem('token', res.data.token)
                // localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            history.push('/login')
            // dispatch(login(res.data.user, res.data.token))
        } catch (err) {
            console.log({err});
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                return alertError(err.response.data.error.details[0] && err.response.data.error.details[0].message)
            }
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }
    }
    function handleChange(e) {
        setRegisterData(prevItemData => ({...prevItemData, [e.target.name]: e.target.value}))
    }
    return (
        <Form handleSubmit={handleSubmit} title='Sign up'>
            <Input 
                id='sign-up-first-name'
                type='text'
                label='First name'
                placeholder='Jane' 
                value={registerData.firstName}
                onChange={handleChange}
                name='firstName'
            />
            <Input 
                id='sign-up-last-name'
                type='text'
                label='Last name'
                placeholder='Doe' 
                value={registerData.lastName}
                onChange={handleChange}
                name='lastName'
            />
            <Input 
                id='sign-up-email'
                type='email'
                label='Email address'
                placeholder='name@example.com' 
                value={registerData.email}
                onChange={handleChange}
                name='email'
            />
            <Input 
                id='sign-up-password'
                type='password'
                label='Password'
                placeholder='Password'
                value={registerData.password}
                onChange={handleChange}
                name='password'
            />
            <Input 
                id='sign-up-confirm-password'
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
                value={registerData.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
            />
        </Form>
    )
}

export default Login;