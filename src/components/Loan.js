import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Loan = ({id ,viewLoan, tableRows}) => {
    const [loanRows, setLoanRows] = useState([]);
    const [startInput, setStartInput] = useState(null);
    const [endInput, setEndInput] = useState(null);

    const [addNewMode, setAddNewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [editMode, setEditMode] = useState(false);
    //gives us access to info about the item
    const index = tableRows.findIndex(row => row.id === id);

    useEffect(() => {
      setLoanRows([
        { id: '1', lendStart: new Date().toLocaleDateString(), lendEnd: new Date().toLocaleDateString() },
        { id: '2', lendStart: new Date().toLocaleDateString(), lendEnd: new Date().toLocaleDateString() },
        { id: '3', lendStart: new Date().toLocaleDateString(), lendEnd: new Date().toLocaleDateString() }
      ]);
    }, []);

    const createNew = () => {
      setAddNewMode(!addNewMode);
    }

    //
    const handleSubmit = () => {
      const id = 1;
      setLoanRows((prevLoanRows) => [...prevLoanRows, {id: id, lendStart: startInput, lendEnd: endInput}]);

    }

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    const handleEditSubmit = (id ) => {

    }

    const handleDelete = (id) => {

    }
    
  return (
    <div className='modal-background'>
        <div className="newRowForm" id="loan">
            <h1>Loan Management</h1>
            <h3>{tableRows[index].description}</h3>
            <button class="addNewButton" onClick={createNew} style={{display: addNewMode ? "none" : "flex"}}>Create New</button>

            {addNewMode && (
              <div>
                <button class="addNewButton" onClick={createNew}>Hide</button>
                <div>
                  <label>Lend Start: </label>
                  <input type="date" onChange={(e) => {setStartInput(e.target.value)}} required></input>
                  <label>Lend End: </label>
                  <input type="date" onChange={(e) => {setEndInput(e.target.value)}} required></input>
                  <button class="addNewButton" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            )}
            <table className='second-table'>
              <thead>
                <th>Id</th>
                <th>Start</th>
                <th>End</th>
              </thead>
              <tbody>
                {loanRows.map((row) => (
                  editMode && row.id == selectedRow ? (
                    <tr>
                      <td>{row.id}</td>
                      <td><input type="date"></input></td>
                      <td><input type="date"></input></td>
                      <td><button className="secondary-button" onClick={() => handleEdit(row.id)}>Confirm</button></td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{row.id}</td>
                      <td>{row.lendStart}</td>
                      <td>{row.lendEnd}</td>
                      <td>
                        <button className="secondary-button" onClick={() => handleEdit(row.id)}>Edit</button>
                        <button className="secondary-button" onClick={() => handleDelete(row.id)}>Delete</button>
                      </td>
                    </tr>
                  )  
                ))}
              </tbody>
            </table>

            <button className="addNewButton" onClick={viewLoan}>Done</button> 
        </div>
        
    </div>
  )
}

export default Loan