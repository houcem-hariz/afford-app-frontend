import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddStore from '../components/Stores/AddStore'
import SearchBar from '../components/Stores/SearchBar'
import StoresTable from '../components/Stores/StoresTable'
import { setAllStores } from '../redux/actions/storesActionCreator'
import { alertError } from '../utils/feedback'

export default function Stores() {

    const [show, setShow] = useState(false);

    const handleClose = () => { 
        setShow(false); 
    }
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    let storesData = []
    const getStores = async () => {
        try {
            const stores = await axios.get(`${process.env.REACT_APP_API_URL}/stores`, { headers: { authorization: token } })
            dispatch(setAllStores(stores.data))
            setFilteredStoresList(stores.data)
        } catch (error) {
            alertError(error.message)
        }
    }

    useEffect(() => {
        getStores()
    }, [])

    // useEffect(() => {
    //     getStores()
    // }, [show, useSelector(state => state.stores.selected)])

    storesData = useSelector(state => state.stores.all)

    let [filteredStoresList, setFilteredStoresList] = useState(storesData)
    
    useEffect(() => {
        setFilteredStoresList(storesData)
    }, [storesData])

    const getUpdatedStoresList = (filterValue) => {
        const storesList = storesData.filter(storeName => storeName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredStoresList(storesList)
    }

    return (
        <div className='container'>
            <div className='store shadow-lg p-3 mx-5 rounded'>
                <div className='row justify-content-between'>
                    <div className="search col-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedStoresList} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <div className='d-flex justify-content-end'>
                            <button className='custom-button px-3 py-1 text-nowrap rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle"></i> Add New Store
                            </button>
                        </div>
                        <AddStore show={show} handleClose={handleClose}/>
                    </div>
                </div>
                <div className='row'>
                    <StoresTable storesList={filteredStoresList} />
                </div>
            </div>
        </div>
    )
}
