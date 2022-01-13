import React from 'react'
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function ProductsTable(props) {
    const productsList = props.productsList.map((product, index) => {
        return <tr key={product._id}>
            <td>{index + 1}</td>
            <td>{product.reference}</td>
            <td>{product.label}</td>
            <td>{product.unitPrice}</td>
            <td>{product.store.name}</td>
            <td>{product.category.name}</td>
            <td>
                <ButtonGroup >
                    <Button className='mx-1 custom-table-button' size="sm"  tag={Link} to={"/products/" + product.id}><i className="bi bi-eye"></i></Button>
                    <Button className='mx-1 custom-table-button' size="sm"  tag={Link} to={"/products/" + product.id}><i className="bi bi-pencil-square"></i></Button>
                    <Button className='mx-1 custom-table-button' size="sm"  onClick={() => this.remove(product.id)}><i className="bi bi-trash"></i></Button>
                </ButtonGroup>
            </td>
        </tr>
    })
    return (
        <Container fluid>
            <Table responsive bordered striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Reference</th>
                        <th>Label</th>
                        <th>Unit Price</th>
                        <th>Store</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList}
                </tbody>
            </Table>
        </Container>
    )
}
