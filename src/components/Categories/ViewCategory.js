import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Table from '../Table'
import Tr from '../Tr'
import categoryImage from '../../images/logo.png'

import { alertError } from '../../utils/feedback'

export default function ViewCategory() {
    const token = useSelector(state => state.user.token)
    const { id } = useParams()
    const [categoryData, setCategoryData] = useState({
        name: '',
        isMainCategory: false,
        mainCategory: ''
    })
    const getCategoryById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`, { headers: { authorization: token } })
            let { name, isMainCategory, mainCategory } = res.data
            if (mainCategory) {
                const mainCategoryData = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${mainCategory}`, { headers: { authorization: token } })
                mainCategory = mainCategoryData.data.name
            }
            setCategoryData({ name, isMainCategory, mainCategory})
        } catch (error) {
            alertError(error.message)
        }
    }
    useEffect(() => {
        getCategoryById(id)
    }, [id])

    return (
        <div className="text-center">
            <h1>Category details</h1>
            {
                categoryData.name && (
                    <>
                        <img alt="item-img" className="img-thumbnail image-size mb-3" src={categoryImage} />
                        <Table striped bordered>
                            <Tr title="Name" description={categoryData.name} />
                            <Tr title="Is Main Category" description={categoryData.isMainCategory.toString()} />
                            <Tr title="Main Category" description={categoryData.mainCategory} />
                        </Table>
                    </>
                )
            }
        </div>
    )
}
