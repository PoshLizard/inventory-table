import React, {useState} from 'react'

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
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default InventorySearch