import { useState } from 'react'
import AddStore from './AddStore'
import SearchBar from './SearchBar'
import StoresTable from './StoresTable'

export default function Stores() {

    const stores = [
        { "id": "03e9e0a0-c29b-4d87-9a22-0ee5ebc73182", "name": "Kertzmann-Treutel", "storeType": "Home", "location": "8433 Melody Crossing", "description": "Major Chemicals" },
        { "id": "07809470-5d9b-49b8-a773-253fdb68b84e", "name": "Senger, Wilkinson and Lowe", "storeType": "Garden", "location": "4712 Oriole Court", "description": "Semiconductors" },
        { "id": "1f1c256c-0bc3-4a74-af26-d2f9e3922cc9", "name": "Rempel-O'Kon", "storeType": "Games", "location": "8825 Manitowish Crossing", "description": "n/a" },
        { "id": "a0ee3904-de55-471f-88aa-716881a289d5", "name": "Waters-Bergstrom", "storeType": "Jewelry", "location": "9 Kings Center", "description": "Semiconductors" },
        { "id": "3fa6ba7a-b895-4660-a10b-d5161f838611", "name": "Vandervort-Sanford", "storeType": "Kids", "location": "16 Summerview Avenue", "description": "Major Pharmaceuticals" },
        { "id": "6352a948-0456-4e60-804b-2cb9c3bd7267", "name": "Breitenberg and Sons", "storeType": "Garden", "location": "35 Talisman Hill", "description": "Clothing/Shoe/Accessory Stores" },
        { "id": "d32a4c9d-9ed2-403d-a742-bed2251317f7", "name": "Kihn, Jenkins and Hoeger", "storeType": "Books", "location": "35 Trailsway Pass", "description": "Major Pharmaceuticals" },
        { "id": "eaccdbf5-03b9-4faf-ba54-0607ffbf35a2", "name": "Willms-Jacobs", "storeType": "Industrial", "location": "45 Sunfield Pass", "description": "Services-Misc. Amusement & Recreation" },
        { "id": "003be957-9d3f-4b5b-a6b7-f325aff248d1", "name": "Altenwerth-Lang", "storeType": "Shoes", "location": "5 Dovetail Pass", "description": "Oil & Gas Production" },
        { "id": "7a810e2b-a9bc-44ce-af9a-ebb76945c2da", "name": "Cronin-Davis", "storeType": "Computers", "location": "87 Jenifer Point", "description": "Banks" },
        { "id": "bc231edf-4598-4681-83b8-15c3935b53af", "name": "Simonis Group", "storeType": "Electronics", "location": "68 Cascade Pass", "description": "Semiconductors" },
        { "id": "f8cb7a60-a4a1-4bf9-a56f-13352190ede7", "name": "Treutel-Murray", "storeType": "Games", "location": "03 Steensland Place", "description": "Professional Services" },
        { "id": "df79195a-0141-4188-a981-71e2bdb8a460", "name": "Johnston-Sawayn", "storeType": "Industrial", "location": "581 Corry Terrace", "description": "Property-Casualty Insurers" },
        { "id": "995ea849-390b-4826-a72d-7c6f5d8156be", "name": "Balistreri, Cole and Christiansen", "storeType": "Kids", "location": "8684 Bunting Terrace", "description": "Containers/Packaging" },
        { "id": "7f5ce24b-1062-4746-9c5b-d4912bacb479", "name": "Blanda, Murray and Walter", "storeType": "Beauty", "location": "176 Menomonie Avenue", "description": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)" },
        { "id": "78936334-ff81-41c5-bace-bc948e1171e9", "name": "Boehm, Schinner and Wolff", "storeType": "Music", "location": "56 Debs Court", "description": "n/a" },
        { "id": "58620134-5362-40a8-97fc-c63280e785bc", "name": "Sporer LLC", "storeType": "Grocery", "location": "12 Kennedy Pass", "description": "Precious Metals" },
        { "id": "2f205f28-eb3d-434d-9794-9d7fadcee21e", "name": "Hyatt, DuBuque and Ziemann", "storeType": "Jewelry", "location": "5 Spohn Road", "description": "Real Estate" },
        { "id": "9cea5bcf-e4a3-4efe-8b31-ed5fdec4cbc9", "name": "Marvin Group", "storeType": "Baby", "location": "2 Di Loreto Junction", "description": "Major Pharmaceuticals" },
        { "id": "af5e1fa7-ff2a-4fc9-82b4-cd60e37ada84", "name": "Jacobs-MacGyver", "storeType": "Outdoors", "location": "99 Ridgeway Court", "description": "Computer Software: Prepackaged Software" }
    ]

    const [filteredStoresList, setFilteredStoresList] = useState(stores)

    const getUpdatedStoresList = (filterValue) => {
        const storesList = stores.filter(storeName => storeName.name.toLowerCase().includes(filterValue.toLowerCase()))
        setFilteredStoresList(storesList)
    }
    return (
        <div className='container'>
            <div className='store shadow-lg p-3 mx-5 rounded'>
                <div className='row justify-content-between'>
                    <div className="search col-4 mt-5 mb-4">
                        <SearchBar handleFilterValue={getUpdatedStoresList} />
                    </div>
                    <div className="col-4 mt-5 mb-4">
                        <AddStore />
                    </div>
                </div>
                <div className='row'>
                    <StoresTable storesList={filteredStoresList} />
                </div>
            </div>
        </div>
    )
}
