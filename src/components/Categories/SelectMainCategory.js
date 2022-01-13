import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function SelectMainCategory(props) {
    const categoriesList = useSelector(state => state.categories.all)
    const mainCategoriesList = categoriesList.filter( category => category.isMainCategory )
    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const categoryIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if ( categoryIndex === 0) props.handleMainCategorySelect('') // no store is selected
        else props.handleMainCategorySelect(mainCategoriesList[categoryIndex -1]._id)
    }

    const categoriesOptions = mainCategoriesList.map(category => {
        return <option key={category._id} value={category.name}>{category.name}</option>
    })
    return (
        <div>
            <p>Main Category: </p>
            <Form.Select disabled={props.disabled} aria-label="Select Category" className='custom-select' value={filter} onChange={handleSelect} > 
                <option>- - -</option>
                { categoriesOptions }
            </Form.Select>
        </div>
    )
}
