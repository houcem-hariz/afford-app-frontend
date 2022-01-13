import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import Input from "../Input";
import { alertError, alertSuccess } from "../../utils/feedback";


function UpdateStore() {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    const {id} = useParams()
    const [storeData, setStoreData] = useState({
        name: '',
        storeType: '',
        location: '',
        description: ''
    })
    const getStoreById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/stores/${id}`, {headers: {authorization: token}})
            const {name, storeType, location, description} = res.data
            setStoreData({name, storeType, location, description})
        } catch (error) {
            alertError(error.message) 
        }
    }
    useEffect(() => {
        getStoreById(id)
    }, [id])
    
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            console.log(storeData);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/stores/${id}`, storeData, {headers: {authorization: token}})
            console.log({res});
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/stores')
            }
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
        setStoreData(prevStoreData => ({...prevStoreData, [e.target.name]: e.target.value}))
    }
    return (
        <div className="container">
            <h1 className="text-center">Update Store</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    label='Name'
                    value={storeData.name}
                    name='name'
                    onChange={handleChange}
                />
                <Input 
                    label='Store type'
                    value={storeData.storeType}
                    name='storeType'
                    onChange={handleChange}
                />
                <Input 
                    label='Location'
                    value={storeData.location}
                    name='location'
                    onChange={handleChange}
                />
                <Input 
                    label='Description'
                    value={storeData.description}
                    name='description'
                    onChange={handleChange}
                />
                <button className="btn custom-button" type="submit" style={{width: '100%'}}>Update</button>
            </form>
        </div>
    )
}

export default UpdateStore;