import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCategory from '../components/Categories/AddCategory'
import SearchBar from '../components/Categories/SearchBar'
import CategoriesTable from '../components/Categories/CategoriesTable'
import { setAllCategories } from '../redux/actions/categoriesActionCreator'
import { alertError } from '../utils/feedback'

export default function Categories() {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.info && state.user.info._id)
    const token = useSelector(state => state.user.token)
    let categoriesData = []
    const getCategories = async () => {
        try {
            const categories = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {headers: {authorization: token}})
            dispatch(setAllCategories(categories.data))
            setFilteredCategoriesList(categories.data)
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
            <div className='category shadow-lg p-3 mx-5 rounded'>
                <div className='row justify-content-between'>
                    <div className="search col-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedCategoriesList} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <AddCategory />
                    </div>
                </div>
                <div className='row'>
                    <CategoriesTable categoriesList={filteredCategoriesList} />
                </div>
            </div>
        </div>
    )
}
