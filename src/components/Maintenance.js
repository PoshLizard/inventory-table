import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Maintenance = ({id, viewMaintenance, tableRows}) => {
    const [maintenanceRows, setMaintenanceRows] = useState([]);
    const index = tableRows.findIndex(row => row.id === id);
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateInput, setDateInput] = useState(null);

    const [addNewMode, setAddNewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [editMode, setEditMode] = useState(false);
    

    //placehodler

    useEffect(() => {
      setMaintenanceRows([
        { id: '1', description: 'Laptop', date: new Date().toLocaleDateString() },
        { id: '2', description: 'Printer', date: new Date().toLocaleDateString() },
        { id: '3', description: 'Monitor', date: new Date().toLocaleDateString() }
      ]);
    }, []);

    const addNewMain = async(desc, date) => {}

    const editMain = async() => {

    }
    const deleteMain = async() => {

    }
    const getMain = async() => {

    }
    const getAllMain = async() =>{

    }

    const createNew = () => {
      setAddNewMode(!addNewMode);
    }

    const handleSubmit = () => {
      
    }

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    const handleEditSubmit = (id) => {
      
    }

    const handleDelete = (id) => {

    }

  return (
    <div className='modal-background'>
        <div className="newRowForm" id="maintenance">
            <h1>Maintenance Management</h1>
            <h3>{tableRows[index].description}</h3>
            <button className="addNewButton" onClick={createNew} style={{display: addNewMode ? "none" : "flex"}}>Create New</button>
            {addNewMode && (
              <div className="maintenanceDiv">
                <button class="addNewButton" onClick={createNew}>Hide</button>
                <div>
                  <label>Description: </label>
                  <input type="text" onChange={(e) => setDescriptionInput(e.target.value)} required></input>
                  <label>Date: </label>
                  <input type="date" onChange={(e) => setDateInput(e.target.value)} required></input>
                  <button className="addNewButton" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            )}
             <table className="second-table">
              <tbody>
                {maintenanceRows.map((row) => (
                  editMode && row.id == selectedRow ? (
                    <tr>
                      <td>{row.id}</td>
                      <td><input type="text"></input></td>
                      <td><input type="date"></input></td>
                      <td><button className="secondary-button" onClick={() => handleEdit(row.id)}>Confirm</button></td>
                      
                    </tr>
                  ) : (
                    <tr>
                      <td>{row.id}</td>
                      <td>{row.description}</td>
                      <td>{row.date}</td>
                      <td>
                        <button className="secondary-button" onClick={() => handleEdit(row.id)}>Edit</button>
                        <button className="secondary-button" onClick={() => handleDelete(row.id)}>Delete</button>
                      </td>
                    </tr>
                  )  
                ))}
              </tbody>
            </table>
            <button className="addNewButton" onClick={viewMaintenance}>Done</button>
        </div>
    </div>
  )
}


export default Maintenance