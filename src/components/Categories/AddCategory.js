import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../redux/actions/categoriesActionCreator'
import { alertError, alertSuccess } from '../../utils/feedback'
import SelectMainCategory from './SelectMainCategory'


export default function AddCategory(props) {
    const dispatch = useDispatch()
    const [newCategoryData, setNewCategoryData] = useState({
        name: '',
        isMainCategory: false,
        mainCategory: null
    })

    const token = useSelector(state => state.user.token)

    function handleChange(e) {
        setNewCategoryData(prevItemData => ({ ...prevItemData, [e.target.name]: e.target.value }))
    }

    
    const [checked, setChecked] = useState(false)

    const handleCategoryCheck = (event) => {
        setChecked(event.target.checked)
    }

    const [selectedMainCategory, setSelectedMainCategory] = useState('')

    const handleMainCategorySelect = (selectedCategoryId) => {
        setSelectedMainCategory(selectedCategoryId)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { name } = newCategoryData


        if (!name) {
            return alertError('Name is required')
        }
        if ((name.length < 2) || (name.length > 70)) {
            return alertError('Name is too short or too long')
        }

        console.log({checked});
        console.log({selectedMainCategory});
        if ( !checked && selectedMainCategory === '') {
            return alertError('Main Category is required')
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/categories/addCategory`, { name, isMainCategory: checked, mainCategory: selectedMainCategory }, { headers: { authorization: token } })

            setTimeout(() => {
                props.handleClose()
            }, 500);

            if (res.data && res.data.message && res.data.createdCategory) {
                alertSuccess(res.data.message)

                // dispatch new action with the created category as a payload
                dispatch(addCategory(res.data.createdCategory))
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

    return (
        <div className="modal-box">
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input required type="text" className="form-control" id="categoryName" aria-describedby="categoryName" name='name' placeholder="Enter Name" value={newCategoryData.name} onChange={handleChange}/>
                        </div>
                        <div className="form-check custom-form-check">
                            <input className="form-check-input" type="checkbox" name='isMainCategory' onChange={handleCategoryCheck} id="mainCategory" />
                            <label className="form-check-label" htmlFor="mainCategory" >
                                Is Main Category ?
                            </label>
                        </div>
                        <div>
                            <SelectMainCategory disabled={checked} handleMainCategorySelect={handleMainCategorySelect} />
                        </div>

                        <button type="submit" className="btn btn-success custom-button mt-4">Add Category</button>
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
