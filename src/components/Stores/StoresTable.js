import { useEffect } from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { selectStore } from '../../redux/actions/storesActionCreator'

import '../style.css'
import DeleteStoreModal from './DeleteStoreModal'
import ViewStore from './ViewStore'

export default function StoresTable(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(selectStore())
        history.replace('/stores')
        // window.location.reload()
    }

    const handleShowModal = (store) => {
        setShowModal(true)
        dispatch(selectStore(store))
    }
    const storesList = props.storesList.map((store, index) => {
        return <tr key={store._id}>
                <td>{index + 1}</td>
                <td>{store.name}</td>
                <td>{store.storeType}</td>
                <td>{store.location}</td>
                <td>{store.description}</td>
                <td>
                    <ButtonGroup >
                        <Button title='View' className='mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/stores/${store._id}`)}}><i className="bi bi-eye"></i></Button>
                        <Button title='Edit' className='mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/stores/update/${store._id}`)}}><i className="bi bi-pencil-square"></i></Button>
                        <Button title='Remove' className='mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); handleShowModal(store) }}><i className="bi bi-trash"></i></Button>
                    </ButtonGroup>
                </td>
                <td hidden><DeleteStoreModal showModal={showModal} handleCloseModal={handleCloseModal} /></td>
            </tr>
    })

    return (
        <Table responsive bordered striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {storesList}
            </tbody>
        </Table>
    )
}
