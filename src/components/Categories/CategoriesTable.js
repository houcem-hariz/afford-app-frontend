import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import ViewCategory from './ViewCategory'

export default function CategoriesTable(props) {

    const categoriesList = props.categoriesList.map((category, index) => {
        console.log({category});
        const subCategories = category.subCategories.map(s => {
            return <li className='list-group-item' key={s._id}>{s.name}</li>
        })
        return <tr key={category._id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>
                <ul className='list-group list-group-flush'>
                    {subCategories}
                </ul>
            </td>
            <td>
                <div className='btn-group' >
                    <button title='View' className='btn mx-1 custom-table-button' size="sm" tag={NavLink} to={"/categories/" + category.id} onClick={ () => <ViewCategory viewCategory={true} /> }><i className="bi bi-eye"></i></button>
                    <button title='Edit' className='btn mx-1 custom-table-button' size="sm" tag={NavLink} to={"/categories/" + category.id}><i className="bi bi-pencil-square"></i></button>
                    <button title='Remove' className='btn mx-1 custom-table-button' size="sm" onClick={() => this.remove(category.id)}><i className="bi bi-trash"></i></button>
                </div>
            </td>
        </tr>
    })

    return (
        <Table responsive bordered striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>SubCategories</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoriesList}
            </tbody>
        </Table>
    )
}
