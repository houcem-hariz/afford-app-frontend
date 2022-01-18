import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertError } from '../utils/feedback'
import Loading from '../components/Loading'
import AddProduct from '../components/Products/AddProduct'
import ProductsTable from '../components/Products/ProductsTable'
import ProductPagination from '../components/Products/ProductPagination'
import SelectCategory from '../components/Products/SelectCategory'
import SelectStore from '../components/Products/SelectStore'
import { setAllProducts } from '../redux/actions/productsActionCreator'
import { setAllStores } from '../redux/actions/storesActionCreator'
import { setAllCategories } from '../redux/actions/categoriesActionCreator'

export default function Products() {

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
    const [productsPerPage] = useState(5);
    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const [skip, setSkip] = useState(0);

    // Change page
    const paginate = pageNumber => setSkip((pageNumber - 1) * productsPerPage)


    // Fetch products data from backend
    const getProducts = async () => {
        try {
            setIsDataLoaded(false)
            const products = await axios.get(`${process.env.REACT_APP_API_URL}/products?limit=${productsPerPage}&skip=${skip}`, { headers: { authorization: token } })
            dispatch(setAllProducts(products.data.products))
            setTotalProductsCount(products.data.count)
            setFilteredProductsList(products.data.products)
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }
    
    let storesList = []
    storesList = useSelector(state => state.stores.all)
    const getStores = async () => {
        try {
            // fetch stores list from database
            const stores = await axios.get(`${process.env.REACT_APP_API_URL}/stores`, { headers: { authorization: token } })
            storesList = stores.data.stores
            dispatch(setAllStores(stores.data.stores))
        } catch (error) {
            alertError(error.message)
        }
    }
    
    let categoriesList = []
    categoriesList = useSelector(state => state.categories.all)
    const getCategories = async () => {
        try {
            // fetch categories list from database
            const categories = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, { headers: { authorization: token } })
            categoriesList = categories.data.categories
            dispatch(setAllCategories(categories.data.categories))
        } catch (error) {
            alertError(error.message)
        }
    }
    
    useEffect(() => {
        getStores()
        getCategories()
        getProducts()
    }, [])
    
    useEffect(() => {
        getProducts()
    }, [skip])
    
    const productsData = useSelector(state => state.products.all)
    
    // Filter search
    let [filteredProductsList, setFilteredProductsList] = useState(productsData)
    
    useEffect(() => {
        setFilteredProductsList(productsData)
    }, [productsData])


    const filterByStoreName = (filterValue) => {
        const filteredProductsByStore = productsData.filter(product => {
            return ((filterValue === '') || (product.store._id === filterValue))
        })
        setFilteredProductsList(filteredProductsByStore)
    }

    const filterByCategoryName = (filterValue) => {
        const filteredProductsByCategory = productsData.filter(product => {
            return ((filterValue === '') || (product.category._id === filterValue))
        })
        setFilteredProductsList(filteredProductsByCategory)
    }


    return (
        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
                <div className='search row'>
                    <div className="col-4 mt-5 mb-4">
                        <SelectCategory handleCategorySelect={filterByCategoryName} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <SelectStore handleStoreSelect={filterByStoreName} />
                    </div>
                    <div className="add-button col-4 mt-5 mb-4">
                        <div>
                            <button className='custom-button px-1 py-1 rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle"> Add New Product </i>
                            </button>
                            <AddProduct show={showAddModal} handleClose={handleClose} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {!isDataLoaded ? <Loading /> :
                        <ProductsTable productsList={filteredProductsList} />}
                </div>
                <div className='row'>
                    <ProductPagination
                        productsPerPage={productsPerPage}
                        totalProductsCount={totalProductsCount}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}
