import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { removeProduct } from '../../redux/actions/productsActionCreator'
import { alertError, alertSuccess } from '../../utils/feedback'

export default function DeleteProductModal({ showModal, handleCloseModal }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const selectedProduct = useSelector(state => state.products.selected)
    const handleDelete = async (product) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${product._id}`, { headers: { authorization: token } })
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                dispatch(removeProduct(product._id))
                handleCloseModal()
            }
        } catch (err) {
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }
    }
    return (
        <div className="modal-box">
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header className="border-bottom-0" closeButton>
                    <Modal.Title className="text-danger">Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">Are you sure that you wanna delete the product <b>{selectedProduct && selectedProduct.label}</b> ?</Modal.Body>
                <Modal.Footer className="border-top-0">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(selectedProduct)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
