import React, {useState} from 'react'
import searchIcon from '../images/search.png'
const InventorySearch = ({  tableRows, setTableRows }) => {
    const [userInput, setUserInput] = useState('');
    const handleSearch = () => {
        const filteredOptions = tableRows.filter(
            (row) => row.description.toLowerCase().includes(userInput) || 
            row.serialNumber.includes(userInput) || 
            row.assetNumber.includes(userInput) ||
            row.grantIssuer.toLowerCase().includes(userInput) ||
            row.storageLocation.includes(userInput)
        )
        setUserInput('');
        setTableRows(filteredOptions);
    }
  return (
    <div className ="search-bar">
        <input onChange={(e) => setUserInput(e.target.value.toLowerCase())} placeholder='Ex: Steve'></input>
        <img src={searchIcon} onClick={handleSearch}/>
    </div>
  )
}

export default InventorySearch