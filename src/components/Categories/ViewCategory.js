import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ViewStore(props) {

    const [show, setShow] = useState(false);
    if (props.viewStore === true) { setShow(true) }
    const handleClose = () => setShow(false);

    return (

        <div className="modal-box">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" />
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control" id="type" aria-describedby="emailHelp" placeholder="Enter Type" />
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control" id="location" aria-describedby="emailHelp" placeholder="Enter Location" />
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control" id="description" placeholder="Enter Description" />
                        </div>

                        <button type="submit" class="btn btn-success custom-button mt-4">Add Store</button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
