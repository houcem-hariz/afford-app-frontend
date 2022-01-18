import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import Input from "../Input";
import { alertError, alertSuccess } from "../../utils/feedback";


function UpdateCategory() {
    const history = useHistory()
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
            console.log("update", res.data);
            if (mainCategory) {
                const mainCategoryData = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${mainCategory}`, { headers: { authorization: token } })
                mainCategory = mainCategoryData.data.name
            }
            setCategoryData({ name, isMainCategory, mainCategory })
        } catch (error) {
            alertError(error.message)
        }
    }
    useEffect(() => {
        getCategoryById(id)
    }, [id])

    async function handleSubmit(e) {
        try {
            e.preventDefault()

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/categories/${id}`, { name: categoryData.name}, { headers: { authorization: token } })

            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/categories')
            }
        } catch (err) {
            if (err && err.response && err.response.data && err.response.data.error && err.response.data.error.details) {
                return alertError(err.response.data.error.details[0] && err.response.data.error.details[0].message)
            }
            if (err && err.response && err.response.data && err.response.data.error) {
                return alertError(err.response.data.error)
            }
        }
    }
    function handleChange(e) {
        setCategoryData(prevCategoryData => ({ ...prevCategoryData, [e.target.name]: e.target.value }))
    }
    return (
        <div className="container">
            <h1 className="text-center">Update Category</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label='Name'
                    value={categoryData.name}
                    name='name'
                    onChange={handleChange}
                />
                <Input
                    label='Is Main Category'
                    value={categoryData.isMainCategory}
                    name='isMainCategory'
                    onChange={handleChange}
                    readOnly
                />
                <Input
                    label='Main Category'
                    value={categoryData.mainCategory || ''}
                    name='mainCategory'
                    onChange={handleChange}
                    readOnly
                />
                <button className="btn custom-button" type="submit" style={{ width: '100%' }}>Update</button>
            </form>
        </div>
    )
}

export default UpdateCategory;