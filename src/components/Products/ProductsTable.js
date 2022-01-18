import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectProduct } from '../../redux/actions/productsActionCreator'
import DeleteProductModal from './DeleteProductModal'


export default function ProductsTable(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(selectProduct())
        history.replace('/products')
    }

    const handleShowModal = (product) => {
        setShowModal(true)
        dispatch(selectProduct(product))
    }

    const productsList = props.productsList.map((product, index) => {
        return <tr key={product._id}>
            <td>{index + 1}</td>
            <td>{product.reference}</td>
            <td>{product.label}</td>
            <td>{product.unitPrice}</td>
            <td>{product.store.name}</td>
            <td>{product.category.name}</td>
            <td>
                <div className='btn-group' >
                    <button className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/products/${product._id}`) }}><i className="bi bi-eye"></i></button>
                    <button className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); history.push(`/products/update/${product._id}`) }}><i className="bi bi-pencil-square"></i></button>
                    <button className='btn mx-1 custom-table-button' size="sm" onClick={(e) => { e.stopPropagation(); handleShowModal(product) }}><i className="bi bi-trash"></i></button>
                </div>
            </td>
            <td hidden><DeleteProductModal showModal={showModal} handleCloseModal={handleCloseModal} /></td>
        </tr>
    })
    return (
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
    )
}
