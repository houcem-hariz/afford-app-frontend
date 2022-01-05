import axios from 'axios'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import AddProduct from '../components/Products/AddProduct'
import SearchBar from '../components/Products/SearchBar'
import ProductsTable from '../components/Products/ProductsTable'
import { setAllProducts } from '../redux/actions/productsActionCreator'
import { alertError } from '../utils/feedback'
import ProductPagination from '../components/Products/ProductPagination'

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
    const paginate = pageNumber =>  setSkip((pageNumber -1) * productsPerPage)

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
    
    useMemo( () => {
        getProducts()
    }, [])
    
    useMemo( () => {
        getProducts()
    }, [skip])
    

    // Filter search
    const productsData = useSelector(state => state.products.all)
    let [filteredProductsList, setFilteredProductsList] = useState(productsData)

    useMemo(() => {
        setFilteredProductsList(productsData)
    }, [productsData])

    const getUpdatedProductsList = (filterValue) => {
        const productsList = productsData.filter(productName => {
            return ((productName.reference.toLowerCase().includes(filterValue.toLowerCase())) ||
                (productName.label.toLowerCase().includes(filterValue.toLowerCase())))
        })
        setFilteredProductsList(productsList)
    }

    return (
        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
                <div className='row justify-content-between'>
                    <div className="search col-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedProductsList} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <div className='d-flex justify-content-end'>
                            <button className='custom-button px-3 py-1 text-nowrap rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle"></i> Add New Product
                            </button>
                        </div>
                        <AddProduct show={showAddModal} handleClose={handleClose} />
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
