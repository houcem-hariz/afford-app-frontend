import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import '../style.css'
import ViewCategory from './ViewCategory'

export default function CategoriesTable(props) {

    const categoriesList = props.categoriesList.map((category, index) => {
        return <tr key={category._id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>
                <ButtonGroup >
                    <Button title='View' className='mx-1 custom-table-button' size="sm" tag={NavLink} to={"/categories/" + category.id} onClick={ () => <ViewCategory viewCategory={true} /> }><i className="bi bi-eye"></i></Button>
                    <Button title='Edit' className='mx-1 custom-table-button' size="sm" tag={NavLink} to={"/categories/" + category.id}><i className="bi bi-pencil-square"></i></Button>
                    <Button title='Remove' className='mx-1 custom-table-button' size="sm" onClick={() => this.remove(category.id)}><i className="bi bi-trash"></i></Button>
                </ButtonGroup>
            </td>
        </tr>
    })

    return (
        <Table responsive bordered striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoriesList}
            </tbody>
        </Table>
    )
}
