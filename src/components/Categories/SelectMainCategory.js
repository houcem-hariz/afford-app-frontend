import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { alertError } from '../../utils/feedback'

export default function SelectMainCategory(props) {

    const token = useSelector(state => state.user.token)

    const [categoriesList, setCategoriesList] = useState([]);
    
    useEffect(() => { 
        const getAllCategories = async () => {
            
            try {
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, { headers: { authorization: token } }) 
                setCategoriesList(result.data.categories)
            }
            catch (error) {
                alertError(error.message)  
            }
        }
        getAllCategories() 
        
    }, [])
    const mainCategoriesList = categoriesList.filter(category => category.isMainCategory === true)
    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const categoryIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if (categoryIndex === 0) props.handleMainCategorySelect('') // no store is selected
        else props.handleMainCategorySelect(mainCategoriesList[categoryIndex - 1]._id)
    }

    const categoriesOptions = mainCategoriesList.map(category => {
        return <option key={category._id} value={category.name}>{category.name}</option>
    })
    return (
        <div>
            <label>Main Category: </label>
            <Form.Select disabled={props.disabled} aria-label="Select Category" className='custom-select' value={filter} onChange={handleSelect} >
                <option>- - -</option>
                {categoriesOptions}
            </Form.Select>
        </div>
    )
}
