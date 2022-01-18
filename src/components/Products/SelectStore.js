import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { alertError } from '../../utils/feedback';


export default function SelectStore(props) {
       
    const token = useSelector(state => state.user.token)

    const [storesList, setStoresList] = useState([]);
    
    useEffect(() => { 
        const getAllStores = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/stores`, { headers: { authorization: token } }) 
                setStoresList(result.data.stores)
            }
            catch (error) {
                alertError(error.message)  
            }
        }
        getAllStores() 
        
    }, [])

    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const storeIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if (storeIndex === 0) props.handleStoreSelect('') // no store is selected
        else props.handleStoreSelect(storesList[storeIndex - 1]._id)
    }

    const storesOptions = storesList.map(store => {
        return <option key={store._id} value={store.name}>{store.name}</option>
    })
    return (
        <div>
            <p>Select Store: </p>
            <Form.Select aria-label="Select Store" className='custom-select' value={filter} onChange={handleSelect} > 
                <option>- - -</option>
                { storesOptions }
            </Form.Select>
        </div>
    )
}
