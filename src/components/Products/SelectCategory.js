import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function SelectCategory(props) {
    const categoriesList = useSelector(state => state.categories.all)
    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const categoryIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if ( categoryIndex === 0) props.handleCategoryFilter('') // no store is selected
        else props.handleCategoryFilter(categoriesList[categoryIndex -1]._id)
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
