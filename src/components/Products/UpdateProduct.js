import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import Input from "../Input";
import { alertError, alertSuccess } from "../../utils/feedback";


function UpdateProduct() {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    const {id} = useParams()
    const [productData, setProductData] = useState({
        reference: '',
        label: '',
        unitPrice: '',
    })
    const getProductById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`, {headers: {authorization: token}})
            const { reference, label, unitPrice } = res.data
            setProductData({ reference, label, unitPrice })
        } catch (error) {
            alertError(error.message) 
        }
    }
    useEffect(() => {
        getProductById(id)
    }, [id])
    
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            console.log(productData);
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, productData, {headers: {authorization: token}})
            console.log({res});
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/products')
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
        setProductData(prevProductData => ({...prevProductData, [e.target.name]: e.target.value}))
    }
    return (
        <div className="container">
            <h1 className="text-center">Update Product</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    label='Reference'
                    value={productData.reference}
                    name='reference'
                    onChange={handleChange}
                    required
                />
                <Input 
                    label='Label'
                    value={productData.label}
                    name='label'
                    onChange={handleChange}
                />
                <Input 
                    label='Unit Price'
                    value={productData.unitPrice}
                    name='unitPrice'
                    type="number"
                    onChange={handleChange}
                />
                <button className="btn custom-button" type="submit" style={{width: '100%'}}>Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct;