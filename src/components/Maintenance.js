import React, {useState} from 'react'
import axios from 'axios'
const Maintenance = ({id, viewMaintenance, tableRows}) => {
    const index = tableRows.findIndex(row => row.id === id);
    const [input, setInput] = useState({});

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
        <div className="newRowForm" id="maintenance">
            <h1>Maintenance Management</h1>
            <h3>{tableRows[index].description}</h3>
            <button className="addNewButton" onClick={viewMaintenance}>Cancel</button>
        </div>
    </div>
  )
}

export default Maintenance