import React, {useState} from 'react'

const InventorySearch = ({ tableData, setTableRows }) => {
    const [userInput, setUserInput] = useState('');


    const handleSearch = () => {
        const filteredOptions = tableData.filter(
            (row) => row.name.toLowerCase().includes(userInput) || 
            row.serialNum.includes(userInput) || 
            row.assetNum.includes(userInput) ||
            row.program.toLowerCase().includes(userInput) ||
            row.loanee.toLowerCase().includes(userInput) 
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