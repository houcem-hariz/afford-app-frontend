import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import AddStore from '../components/Stores/AddStore'
import SearchBar from '../components/Stores/SearchBar'
import Pagination from '../components/Pagination'
import StoresTable from '../components/Stores/StoresTable'
import { setAllStores } from '../redux/actions/storesActionCreator'
import { alertError } from '../utils/feedback'

export default function Stores() {

    const dispatch = useDispatch()
    
    const [filter, setFilter] = useState('')
    // Add Product Modal management
    const [showAddModal, setShowAddModal] = useState(false);
    const handleClose = () => {
        setShowAddModal(false);
    }
    const handleShow = () => setShowAddModal(true);

    // Loading data
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    // User token
    const token = useSelector(state => state.user.token)

    // Pagination
    const [storesPerPage] = useState(5);
    const [totalStoresCount, setTotalStoresCount] = useState(0);
    const [skip, setSkip] = useState(0);
    
    // Change page
    const paginate = pageNumber =>  setSkip((pageNumber -1) * storesPerPage)

    const getStores = async () => {
        try {
            setIsDataLoaded(false)
            const stores = await axios.get(`${process.env.REACT_APP_API_URL}/stores?limit=${storesPerPage}&skip=${skip}&filter=${filter}`, { headers: { authorization: token } })
            dispatch(setAllStores(stores.data.stores))
            setTotalStoresCount(stores.data.count)
            setFilteredStoresList(stores.data.stores)
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }

    useEffect(() => {
        getStores()
    }, [])
    
    useEffect( () => {
        getStores()
    }, [skip, filter])
    

    const storesData = useSelector(state => state.stores.all)

    let [filteredStoresList, setFilteredStoresList] = useState(storesData)

    useEffect(() => {
        setFilteredStoresList(storesData)
    }, [storesData])

    const getUpdatedStoresList = (filterValue) => {
        setSkip(0)
        setFilter(filterValue)
        const storesList = storesData.filter(storeName => storeName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredStoresList(storesList)
    }

    return (
        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
                <div className='search row'>
                    <div className="col-xs-12 col-sm-6 col-md-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedStoresList} />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 mt-5 mb-4">
                        <div>
                            <button title='Add' className='custom-button px-1 py-1 rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle"> Add New Store </i>
                            </button>
                        </div>
                        <AddStore show={showAddModal} handleClose={handleClose} />
                    </div>
                </div>
                <div className='row'>
                    {!isDataLoaded ? <Loading /> :
                        <StoresTable storesList={filteredStoresList} skip={skip} />}
                </div>
                <div className='row'>
                    <Pagination
                        itemsPerPage={storesPerPage}
                        totalItemsCount={totalStoresCount}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}
