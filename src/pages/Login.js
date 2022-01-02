import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

import Form from '../components/Form';
import Input from '../components/Input';

import { login } from '../redux/actions/userActionCreators';
import { alertError, alertSuccess } from '../utils/feedback';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        console.log({email, password});
        e.preventDefault();
        if (!email) {
            return alertError('Email is required')
        }
        if (!password) {
            return alertError('Password is required')
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
            if (res.data && res.data.message && res.data.user && res.data.token) {
                alertSuccess(res.data.message)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            dispatch(login(res.data.user, res.data.token))
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

    return (
        <Form handleSubmit={handleSubmit} title='Sign in'>
            <Input 
                id='floatingInput'
                type='email'
                label='Email address'
                placeholder='name@example.com' 
                value={email} 
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input 
                id='floatingPassword'
                type='password'
                label='Password'
                placeholder='Password'
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
            />
        </Form>
    )
}

export default Login;