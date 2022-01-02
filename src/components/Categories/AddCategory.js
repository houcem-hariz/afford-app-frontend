import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


export default function AddStore() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='d-flex justify-content-end'>
            <button className='custom-button px-3 py-1 text-nowrap rounded-pill' onClick={handleShow}>
                <i className="px-2 bi bi-plus-circle"></i> Add New Category
            </button>

            <div className="modal-box">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="type" aria-describedby="emailHelp" placeholder="Enter Type" />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="location" aria-describedby="emailHelp" placeholder="Enter Location" />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="description" placeholder="Enter Description" />
                            </div>

                            <button type="submit" className="btn btn-success custom-button mt-4">Add Category</button>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
