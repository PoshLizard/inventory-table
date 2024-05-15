import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Loan = ({id ,viewLoan, tableRows}) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [loanRows, setLoanRows] = useState([]);

    const [nameInput, setNameInput] = useState('');
    const [startInput, setStartInput] = useState(new Date().toISOString().split('T')[0]);
    const [endInput, setEndInput] = useState(new Date().toISOString().split('T')[0]);
    
    const [editNameInput, setEditNameInput] = useState('');
    const [editStartInput, setEditStartInput] = useState(null);
    const [editEndInput, setEditEndInput] = useState(null);

    const [addNewMode, setAddNewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [editMode, setEditMode] = useState(false);
    //gives us access to info about the item
    const index = tableRows.findIndex(row => row.id === id);

    useEffect(() => {
      fetchData();
    }, []);

    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/loans`);
        if (response && response.data) {
          console.log()
          const loanRowsWithIsoDates = response.data.map(loan => ({
            ...loan,
            startDate: new Date(loan.startDate).toISOString().split('T')[0],
            endDate: new Date(loan.endDate).toISOString().split('T')[0]
          }));
          setLoanRows(loanRowsWithIsoDates);
        } else {
          setLoanRows([]);
        }
      } catch (error) {
        console.error('Could not retrieve loans', error);
      }
    }

    const createNew = () => {
      setAddNewMode(!addNewMode);
    }

    //
    const handleSubmit = () => {  
      const newRow = { name: nameInput, startDate: new Date(startInput).toISOString().split('T')[0], endDate: new Date(endInput).toISOString().split('T')[0]}
      console.log(newRow);
      create(newRow);
    }

    async function create(newRow) {
      try{
        await axios.post(`${apiUrl}/loans`, newRow); 
        fetchData();
      } catch(error) {
        console.error('could not generate new loan')
      }  
    }

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    const handleEditSubmit = (mainId) => {
      console.log(startInput);
      
      const updatedRows = loanRows.map((row) => {
        const name = editNameInput === "" ? row.Name : editNameInput;
        const formattedStartDate = editStartInput === "" ? row.startDate : new Date(editStartInput).toISOString().split('T')[0];
        const formattedEndDate = editStartInput === "" ? row.endDate :new Date(editEndInput).toISOString().split('T')[0];
        return row.id === selectedRow ? { ...row, name: name, startDate: formattedStartDate, endDate: formattedEndDate } : row;
      });
      const newRow = updatedRows.find((row) => row.id === selectedRow);
      console.log(newRow);
      async function edit() {
        try{
          await axios.put(`${apiUrl}/loans/${mainId}`, newRow); 
          setLoanRows(updatedRows);
          setEditNameInput('');
          handleEdit(mainId);
        } catch(error) {
          console.error('could not edit loan')
        } 
        }
        edit();
    }

    const handleDelete = (id) => {
      async function deleteLoan() {
        try{
          await axios.delete(`${apiUrl}/loans/${id}`)
          fetchData();
        } catch(error) {
          console.error("could not delete loan");
        }
      }
      deleteLoan();
    }
    
  return (
    <div className='modal-background'>
        <div className="newRowForm" id="loan">
            <h1>Loan Management</h1>
            <h3>{tableRows[index].description}</h3>
            <button className="addNewButton" onClick={createNew} style={{display: addNewMode ? "none" : "flex"}}>Create New</button>

            {addNewMode && (
              <div>
                <button class="addNewButton" onClick={createNew}>Hide</button>
                <div>
                  <label>Name:</label>
                  <input type="text" onChange={(e) => {setNameInput(e.target.value)}} required></input>
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
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
              </thead>
              <tbody>
                {loanRows.map((row) => (
                  editMode && row.id == selectedRow ? (
                    <tr>
                      <td>{row.id}</td>
                      <td><input type="text" defaultValue={row.name} onChange={(e) => setEditNameInput(e.target.value)}></input></td>
                      <td><input type="date" defaultValue={row.startDate} onChange={(e) => setEditStartInput(e.target.value)}></input></td>
                      <td><input type="date" defaultValue={row.endDate} onChange={(e) => setEditEndInput(e.target.value)}></input></td>
                      <td><button className="secondary-button" onClick={() => handleEditSubmit(row.id)}>Confirm</button></td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.startDate}</td>
                      <td>{row.endDate}</td>
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