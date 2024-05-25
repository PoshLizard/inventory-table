import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { update } from 'firebase/database';
const Loan = ({id ,viewLoan, tableRows}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loanRows, setLoanRows] = useState([]);

    const [nameInput, setNameInput] = useState('');
    const [startInput, setStartInput] = useState(new Date().toISOString().split('T')[0]);
    const [endInput, setEndInput] = useState('');
    
    const [editNameInput, setEditNameInput] = useState('');
    const [editStartInput, setEditStartInput] = useState('');
    const [editEndInput, setEditEndInput] = useState('');

    const [addNewMode, setAddNewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [editMode, setEditMode] = useState(false);

    //exception for when loan is out  
    const [currentlyLoaned, setCurrentlyLoaned] = useState(false);
    const [issuedTo, setIssuedTo] = useState('');
    const [errorText, setErrorText] = useState('')
 
    //gives us access to info about the item
    const index = tableRows.findIndex(row => row.id === id);

    const [isFetchDataComplete, setIsFetchDataComplete] = useState(false);

    useEffect(() => {
      fetchData();
    }, [])

    useEffect(() => {
      if(isFetchDataComplete){
        updateLaptopTable();
      }
      
    }, [isFetchDataComplete]);

   

    async function updateLaptopTable(){
        console.log('hess')
        const currentRow = tableRows.find(row => row.id === id);
        const newRow={...currentRow, issuedTo: currentlyLoaned ? issuedTo : "N/A",
        status: currentlyLoaned ? "Loaned" : "Available"};
        console.log(newRow);
        console.log(issuedTo);
        try{
          await axios.put(`${apiUrl}/computers/${id}`, newRow);
          setIsFetchDataComplete(false);
        }catch(error){
          console.error('could not update laptop table from loans');
        }
    }


    async function fetchData() {
      try {
        console.log('computer id' + id);
        const response = await axios.get(`${apiUrl}/computers/${id}`);
        console.log(response.data);
        const loanData = response.data.loans;
        console.log(loanData);
        if(Array.isArray(loanData) && loanData.length === 0){
          setLoanRows([]);
          setCurrentlyLoaned(false);
        }
        else if (loanData) {
          const loanRowsWithIsoDates = loanData.map(loan => ({
            ...loan,
            startDate: new Date(loan.startDate).toISOString().split('T')[0],
            endDate: loan.endDate ? new Date(loan.endDate).toISOString().split('T')[0] : ''
          }));
          setLoanRows(loanRowsWithIsoDates);
          if(loanRowsWithIsoDates[loanRowsWithIsoDates.length -1].endDate === ""){
            setCurrentlyLoaned(true);
          }else{ 
            setCurrentlyLoaned(false);
            setErrorText("");
          }
        } else {
          setLoanRows([]);
        }
        setIsFetchDataComplete(true);
      } catch (error) {
        console.error('Could not retrieve loans', error);
      }
    }

    const createNew = () => {
      setAddNewMode(!addNewMode);
    }
 
    const handleSubmit = (e) => {  
      e.preventDefault();
      const newRow = { name: nameInput, startDate: new Date(startInput).toISOString().split('T')[0], endDate: endInput !== "" ? new Date(endInput).toISOString().split('T')[0] : ""}
      setIssuedTo(nameInput);
      console.log(nameInput);
      console.log(issuedTo);
      create(newRow);
    }


    async function create(newRow) {
      if(currentlyLoaned){
        setErrorText("End previous loan to add new one");
      } else{
      try{
        console.log(newRow);
        await axios.put(`${apiUrl}/loans/appendLoan/${id}`, newRow);  
        fetchData();
      } catch(error) {
        console.error('could not generate new loan')
      }} 
    }

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    const handleEditSubmit = (mainId) => {
      const updatedRows = loanRows.map((row) => {
        const name = editNameInput === "" ? row.name : editNameInput;
        const formattedStartDate = editStartInput === "" ? row.startDate : new Date(editStartInput).toISOString().split('T')[0];
        const formattedEndDate = editEndInput === "" ? row.endDate : new Date(editEndInput).toISOString().split('T')[0];
        return row.id === selectedRow ? { ...row, name: name, startDate: formattedStartDate, endDate: formattedEndDate } : row;
      });

      console.log(updatedRows);

      const newRow = updatedRows.find((row) => row.id === selectedRow);
      console.log(newRow);
      async function edit() {
        try{
          console.log(mainId);
          await axios.put(`${apiUrl}/loans/${id}`, newRow); 
          setEditNameInput('');
          handleEdit(mainId);
          fetchData();
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
            <button onClick={fetchData}> </button>
            <h3>{tableRows[index].description}</h3>
            <button className="addNewButton" onClick={createNew} style={{display: addNewMode ? "none" : "flex"}}>Create New</button>

            {addNewMode && (
              <div className="loanAddForm">
                <button class="addNewButton" onClick={createNew}>Hide</button>
                <form onSubmit={handleSubmit}>
                  <label>Name:</label>
                  <input type="text" onChange={(e) => {setNameInput(e.target.value)}} required></input>
                  <label>Lend Start: </label>
                  <input type="date" onChange={(e) => {setStartInput(e.target.value)}} required></input>
                  <label>Lend End: </label>
                  <input type="date" onChange={(e) => {setEndInput(e.target.value)}}></input>
                  <button class="addNewButton" type="submit">Submit</button>
                </form>
                <p style={{color: "var(--code-orange)"}}>{errorText}</p>
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