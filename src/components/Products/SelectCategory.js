import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { alertError } from '../../utils/feedback';

export default function SelectCategory(props) {

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

    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const categoryIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if (categoryIndex === 0) props.handleCategorySelect('') // no store is selected
        else props.handleCategorySelect(categoriesList[categoryIndex - 1]._id)
    }

    const categoriesOptions = categoriesList.map(category => {
        return <option key={category._id} value={category.name}>{category.name}</option>
    })
    
    return (
        <div>
            <p>Select Category: </p>
            <Form.Select aria-label="Select Category" className='custom-select' value={filter} onChange={handleSelect} > 
                <option>- - -</option>
                { categoriesOptions }
            </Form.Select>
        </div>
    )
}
