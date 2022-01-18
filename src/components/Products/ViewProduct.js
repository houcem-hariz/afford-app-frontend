import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Table from '../Table'
import Tr from '../Tr'
import productImage from '../../images/logo.png'

import { alertError } from '../../utils/feedback'
import Loading from '../Loading'

export default function ViewProduct() {
    const token = useSelector(state => state.user.token)
    const { id } = useParams()
    const [productData, setProductData] = useState({
        reference: '',
        label: '',
        unitPrice: '',
    })

    // Loading data
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const getProductById = async (id) => {
        try {
            setIsDataLoaded(false)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`, { headers: { authorization: token } })
            const { reference, label, unitPrice } = res.data
            setProductData({ reference, label, unitPrice })
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }
    useEffect(() => {
        getProductById(id)
    }, [id])

    return (
        <div className="text-center">
            <h1>Product details</h1>
            {
                !isDataLoaded ? <Loading /> :
                productData.reference && (
                    <>
                        <img alt="item-img" className="img-thumbnail image-size mb-3" src={productImage} />
                        <Table striped bordered>
                            <Tr title="Reference" description={productData.reference} />
                            <Tr title="Label" description={productData.label} />
                            <Tr title="Unit Price" description={productData.unitPrice} />
                        </Table>
                    </>
                )
            }
        </div>
    )
}
