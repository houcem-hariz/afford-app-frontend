import React, { useState } from 'react'

export default function SearchBar(props) {

    const [filter, setFilter] = useState('');

    const handleInputChange = (inputText) => {
        setFilter(inputText)
        props.handleFilterValue(inputText)
    }

    return (
        <div className="search">
            <form className="form-inline">
                <input value={filter}
                    onChange={event => handleInputChange(event.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search Store ..." aria-label="Search" />
            </form>
        </div>
    )
}
