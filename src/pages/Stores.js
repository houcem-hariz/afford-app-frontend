import axios from 'axios'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import AddStore from '../components/Stores/AddStore'
import SearchBar from '../components/Stores/SearchBar'
import StorePagination from '../components/Stores/StorePagination'
import StoresTable from '../components/Stores/StoresTable'
import { setAllStores } from '../redux/actions/storesActionCreator'
import { alertError } from '../utils/feedback'

export default function Stores() {

    const dispatch = useDispatch()
    
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
            const stores = await axios.get(`${process.env.REACT_APP_API_URL}/stores?limit=${storesPerPage}&skip=${skip}`, { headers: { authorization: token } })
            dispatch(setAllStores(stores.data.stores))
            setTotalStoresCount(stores.data.count)
            setFilteredStoresList(stores.data.stores)
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }

    useMemo(() => {
        getStores()
    }, [])
    
    useMemo( () => {
        getStores()
    }, [skip])
    

    const storesData = useSelector(state => state.stores.all)

    let [filteredStoresList, setFilteredStoresList] = useState(storesData)

    useMemo(() => {
        setFilteredStoresList(storesData)
    }, [storesData])

    const getUpdatedStoresList = (filterValue) => {
        const storesList = storesData.filter(storeName => storeName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredStoresList(storesList)
    }

    return (
        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
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
                        <AddStore show={showAddModal} handleClose={handleClose} />
                    </div>
                </div>
                <div className='row'>
                    {!isDataLoaded ? <Loading /> :
                        <StoresTable storesList={filteredStoresList} />}
                </div>
                <div className='row'>
                    <StorePagination
                        storesPerPage={storesPerPage}
                        totalStoresCount={totalStoresCount}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}
