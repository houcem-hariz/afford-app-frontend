import React from 'react'
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const products = []

export default function ProductsTable() {
    const productsList = products.map((product, index) => {
        return <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.productType}</td>
            <td>{product.location}</td>
            <td>{product.description}</td>
            <td>
                <ButtonGroup >
                    <Button className='mx-1' size="sm" variant="success" tag={Link} to={"/products/" + product.id}><i className="bi bi-eye"></i></Button>
                    <Button className='mx-1' size="sm" variant="primary" tag={Link} to={"/products/" + product.id}><i className="bi bi-pencil-square"></i></Button>
                    <Button className='mx-1' size="sm" variant="danger" onClick={() => this.remove(product.id)}><i className="bi bi-trash"></i></Button>
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
                        <th>Name</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Description</th>
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
