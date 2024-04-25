import React, {useState} from 'react'
import axios from 'axios'
const Loan = ({id ,viewLoan, tableRows}) => {
    const [input, setInput] = useState({});
    //gives us access to info about the item
    const index = tableRows.findIndex(row => row.id === id);
    const addNewMain = async() => {

    }
    const editMain = async() => {

    }
    const deleteMain = async() => {

    }
    const getMain = async() => {

    }
    const getAllMain = async() =>{

    }

    
  return (
    <div className='modal-background'>
        <div className="newRowForm" id="loan">
            <h1>Loan Management</h1>
            <h3>{tableRows[index].description}</h3>
            
            <button className="addNewButton" onClick={viewLoan}>Cancel</button> 
        </div>
        
    </div>
  )
}

export default Loan