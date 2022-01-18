import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Table from '../Table'
import Tr from '../Tr'
import storeImage from '../../images/logo.png'

import { alertError } from '../../utils/feedback'
import Loading from '../Loading'

export default function ViewStore() {
    const token = useSelector(state => state.user.token)
    const { id } = useParams()
    const [storeData, setStoreData] = useState({
        name: '',
        storeType: '',
        location: '',
        description: ''
    })

    // Loading data
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const getStoreById = async (id) => {
        try {
            setIsDataLoaded(false)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/stores/${id}`, { headers: { authorization: token } })
            const { name, storeType, location, description } = res.data
            setStoreData({ name, storeType, location, description })
            setIsDataLoaded(true)
        } catch (error) {
            alertError(error.message)
        }
    }
    useEffect(() => {
        getStoreById(id)
    }, [id])

    return (
        <div className="text-center">
            <h1>Store details</h1>
            {
                !isDataLoaded ? <Loading /> :
                storeData.name && (
                    <>
                        <img alt="item-img" className="img-thumbnail image-size mb-3" src={storeImage} />
                        <Table striped bordered>
                            <Tr title="Name" description={storeData.name} />
                            <Tr title="Store type" description={storeData.storeType} />
                            <Tr title="Location" description={storeData.location} />
                            <Tr title="Description" description={storeData.description} />
                        </Table>
                    </>
                )
            }
        </div>
    )
}
