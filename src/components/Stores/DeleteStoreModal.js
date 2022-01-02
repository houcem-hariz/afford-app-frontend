import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeStore } from '../../redux/actions/storesActionCreator'
import { alertError, alertSuccess } from '../../utils/feedback'

export default function DeleteStoreModal({ showModal, handleCloseModal }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const selectedStore = useSelector(state => state.stores.selected)
    const handleDelete = async (store) => {
        console.log({store});
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/stores/${store._id}`, { headers: { authorization: token } })
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                dispatch(removeStore(store._id))
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
                    <Modal.Title className="text-danger">Delete store</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">Are you sure that you wanna delete the store <b>{selectedStore && selectedStore.name}</b> ?</Modal.Body>
                <Modal.Footer className="border-top-0">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(selectedStore)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
