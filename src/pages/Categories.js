import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCategory from '../components/Categories/AddCategory'
import SearchBar from '../components/Categories/SearchBar'
import CategoriesTable from '../components/Categories/CategoriesTable'
import { setAllCategories } from '../redux/actions/categoriesActionCreator'
import { alertError } from '../utils/feedback'
import Loading from '../components/Loading'

export default function Categories() {

    const dispatch = useDispatch()

    // Add Product Modal management
    const [showAddModal, setShowAddModal] = useState(false);
    const handleClose = () => {
        setShowAddModal(false);
    }
    const handleShow = () => setShowAddModal(true);

    // Loading data
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const token = useSelector(state => state.user.token)

    // Pagination
    const [categoriesPerPage] = useState(5);
    const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
    const [skip, setSkip] = useState(0);

    // Change page
    const paginate = pageNumber => setSkip((pageNumber - 1) * categoriesPerPage)

    let categoriesData = []
    const getCategories = async () => {
        try {
            setIsDataLoaded(false)
            const categories = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, { headers: { authorization: token } })
            dispatch(setAllCategories(categories.data.categories))
            setFilteredCategoriesList(categories.data.categories)
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    categoriesData = useSelector(state => state.categories.all)

    let [filteredCategoriesList, setFilteredCategoriesList] = useState(useSelector(state => state.categories.all))

    const getUpdatedCategoriesList = (filterValue) => {
        const categoriesList = categoriesData.filter(storeName => storeName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredCategoriesList(categoriesList)
    }

    return (

        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
                <div className='row justify-content-between'>
                    <div className="search col-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedCategoriesList} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <div className='d-flex justify-content-end'>
                            <button className='custom-button px-1 py-1 rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle">Add New Category</i>
                            </button>
                        </div>
                        <AddCategory show={showAddModal} handleClose={handleClose} />
                    </div>
                </div>
                <div className='row'>
                    {!isDataLoaded ? <Loading /> :
                        <CategoriesTable categoriesList={filteredCategoriesList} />}
                </div>
                {/* <div className='row'>
                    <CategoryPagination
                        categoriesPerPage={categoriesPerPage}
                        totalCategoriesCount={totalCategoriesCount}
                        paginate={paginate}
                    />
                </div> */}
            </div>
        </div>
    )
}
