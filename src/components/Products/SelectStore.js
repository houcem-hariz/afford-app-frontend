import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'


export default function SelectStore(props) {
    
    const storesList = useSelector(state => state.stores.all)
    const [filter, setFilter] = useState('- - -')

    const handleSelect = (event) => {
        const storeIndex = event.target.selectedIndex
        setFilter(event.target.value)
        if ( storeIndex === 0) props.handleStoreFilter('') // no store is selected
        else props.handleStoreFilter(storesList[storeIndex -1]._id)
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
