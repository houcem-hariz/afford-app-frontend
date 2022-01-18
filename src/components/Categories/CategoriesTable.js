import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { selectCategory } from '../../redux/actions/categoriesActionCreator'
import DeleteCategoryModal from './DeleteCategoryModal'


export default function CategoriesTable(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(selectCategory())
        history.replace('/categories')
    }

    const handleShowModal = (category) => {
        setShowModal(true)
        dispatch(selectCategory(category))
    }

    let subCategoriesListItems = []
    const categoriesList = props.categoriesList.map((category, index) => {
        if (category.subCategories) {
            subCategoriesListItems = category.subCategories.map(subCategory => {
                return <li className='list-group-item' key={subCategory._id}>{subCategory.name}</li>
            })
        }
        return <tr key={category._id}>
            <td>{props.skip + index + 1}</td>
            <td>{category.name}</td>
            <td>{category.isMainCategory.toString()}</td>
            <td>
                <ul className='list-group list-group-flush'>
                    {subCategoriesListItems}
                </ul>
            </td>
            <td>
                <div className='btn-group' >
                    <button title='View' className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/categories/${category._id}`) }}><i className="bi bi-eye"></i></button>
                    <button title='Edit' className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/categories/update/${category._id}`) }}><i className="bi bi-pencil-square"></i></button>
                    <button title='Remove' className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); handleShowModal(category) }}><i className="bi bi-trash"></i></button>
                </div>
            </td>
            <td hidden><DeleteCategoryModal showModal={showModal} handleCloseModal={handleCloseModal} /></td>
        </tr>
    });

    return (
        <Table responsive bordered striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Is Main Category</th>
                    <th>Sub Categories</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoriesList}
            </tbody>
        </Table>
    )
}
