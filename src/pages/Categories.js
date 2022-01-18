import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import AddCategory from '../components/Categories/AddCategory'
import SearchBar from '../components/Categories/SearchBar'
import Pagination from '../components/Pagination'
import CategoriesTable from '../components/Categories/CategoriesTable'
import { setAllCategories } from '../redux/actions/categoriesActionCreator'
import { alertError } from '../utils/feedback'

export default function Categories() {

    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')

    // Add Category Modal management
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
    const [categoriesPerPage] = useState(5);
    const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
    const [skip, setSkip] = useState(0);

    // Change page
    const paginate = pageNumber => setSkip((pageNumber - 1) * categoriesPerPage)

    const getCategories = async () => {
        try {
            setIsDataLoaded(false)
            const categories = await axios.get(`${process.env.REACT_APP_API_URL}/categories?limit=${categoriesPerPage}&skip=${skip}&filter=${filter}`, { headers: { authorization: token } })
            dispatch(setAllCategories(categories.data.categories))
            setTotalCategoriesCount(categories.data.count)
            setFilteredCategoriesList(categories.data.categories)
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect( () => {
        getCategories()
    }, [skip, filter])

    const categoriesData = useSelector(state => state.categories.all)

    let [filteredCategoriesList, setFilteredCategoriesList] = useState(categoriesData)

    useEffect(() => {
        setFilteredCategoriesList(categoriesData)
    }, [categoriesData])

    const getUpdatedCategoriesList = (filterValue) => {
        setSkip(0)
        setFilter(filterValue)
        const categoriesList = categoriesData.filter(categoryName => categoryName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredCategoriesList(categoriesList)
    }

    return (

        <div className='container'>
            <div className='shadow-lg p-3 mx-5 rounded'>
                <div className='search row'>
                    <div className="col-xs-12 col-sm-6 col-md-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedCategoriesList} />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 mt-5 mb-4">
                        <div>
                            <button title='Add' className='custom-button px-1 py-1 rounded-pill' onClick={handleShow}>
                                <i className="px-2 bi bi-plus-circle"> Add New Category </i>
                            </button>
                        </div>
                        <AddCategory show={showAddModal} handleClose={handleClose} />
                    </div>
                </div>
                <div className='row'>
                    {!isDataLoaded ? <Loading /> :
                        <CategoriesTable categoriesList={filteredCategoriesList} skip={skip}/>}
                </div>
                <div className='row'>
                    <Pagination
                        itemsPerPage={categoriesPerPage}
                        totalItemsCount={totalCategoriesCount}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}
