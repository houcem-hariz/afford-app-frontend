import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addStore } from '../../redux/actions/storesActionCreator';
import { alertError, alertSuccess } from '../../utils/feedback';


export default function AddStore(props) {

    const dispatch = useDispatch()
    const [newStoreData, setNewStoreData] = useState({
        name: '',
        storeType: '',
        location: '',
        description: ''
    })


    const token = useSelector(state => state.user.token)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { name, storeType, location, description } = newStoreData
        

        if (!name) {
            return alertError('Name is required')
        }
        if ((name.length < 2) || (name.length > 70)) {
            return alertError('Name is too short or too long')
        }

        if ((storeType.length < 2) || (storeType.length > 50)) {
            return alertError('Store type is too short or too long')
        }

        if (description.length > 200) {
            return alertError('Description is too long')
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/stores/addStore`, { name, storeType, location, description }, {headers: {authorization: token}})
            
            setTimeout(() => {
                props.handleClose()                
            }, 500);

                
            if (res.data && res.data.message && res.data.createdStore) {
                alertSuccess(res.data.message)
                console.log('in FRONT END');
                console.log({store: res.data.createdStore});
                // dispatch new action with the created store as a payload
                dispatch( addStore(res.data.createdStore) )
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
        setNewStoreData(prevItemData => ({ ...prevItemData, [e.target.name]: e.target.value }))
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
                                <input type="text" className="form-control" id="name"  placeholder="Enter Name" value={newStoreData.name}
                                    onChange={handleChange}
                                    name='name' />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="type"  placeholder="Enter Type" value={newStoreData.storeType}
                                    onChange={handleChange}
                                    name='storeType' />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="location" placeholder="Enter Location" value={newStoreData.location}
                                    onChange={handleChange}
                                    name='location' />
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" id="description" placeholder="Enter Description" value={newStoreData.description}
                                    onChange={handleChange}
                                    name='description'/>
                            </div>

                            <button type="submit" className="btn btn-success custom-button mt-4" >Add Store</button>
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
