import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/productsActionCreator';
import { alertError, alertSuccess } from '../../utils/feedback';


export default function AddProduct(props) {

    const dispatch = useDispatch()
    const [newProductData, setNewProductData] = useState({
        reference: '',
        label: '',
        unitPrice: ''
    })


    const token = useSelector(state => state.user.token)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { reference, label, unitPrice } = newProductData
        

        if (!reference) {
            return alertError('Name is required')
        }
        if ((reference.length < 2) || (reference.length > 70)) {
            return alertError('Name is too short or too long')
        }

        if ((label.length < 2) || (label.length > 50)) {
            return alertError('Product type is too short or too long')
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/products/addProduct`, { reference, label, unitPrice }, {headers: {authorization: token}})
            
            setTimeout(() => {
                props.handleClose()                
            }, 500);

                
            if (res.data && res.data.message && res.data.createdProduct) {
                alertSuccess(res.data.message)
                console.log('in FRONT END');
                console.log({product: res.data.createdProduct});
                // dispatch new action with the created product as a payload
                dispatch( addProduct(res.data.createdProduct) )
            }


        } catch (err) {
            console.log({ err });
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                return alertError(err.response.data.error.details[0] && err.response.data.error.details[0].message)
            }
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }

    }

    function handleChange(e) {
        setNewProductData(prevItemData => ({ ...prevItemData, [e.target.name]: e.target.value }))
    }

    return (
            <div className="modal-box">
                <Modal
                    show={props.show}
                    onHide={props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="reference"  placeholder="Enter reference" value={newProductData.reference}
                                    onChange={handleChange}
                                    name='reference' />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="label"  placeholder="Enter Label" value={newProductData.label}
                                    onChange={handleChange}
                                    name='label' />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="unitPrice" placeholder="Enter Location" value={newProductData.unitPrice}
                                    onChange={handleChange}
                                    name='unitPrice' />
                            </div>

                            <button type="submit" className="btn btn-success custom-button mt-4" >Add Product</button>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
    )
}
