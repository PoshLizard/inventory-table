import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Maintenance = ({id, viewMaintenance, tableRows}) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [maintenanceRows, setMaintenanceRows] = useState([]);
    const index = tableRows.findIndex(row => row.id === id);
    
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0]);

    const [editDescriptionInput, setEditDescriptionInput] = useState('');
    const [editDateInput, setEditDateInput] = useState(new Date().toISOString().split('T')[0]);

    const [addNewMode, setAddNewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [editMode, setEditMode] = useState(false);
    

    //placehodler

    useEffect(() => {
      setMaintenanceRows([
        { id: '1', description: 'Laptop', date: new Date().toISOString().split('T')[0] },
        { id: '2', description: 'Printer', date: new Date().toISOString().split('T')[0] },
        { id: '3', description: 'Monitor', date: new Date().toISOString().split('T')[0] }
      ]);
    }, []);


    const createNew = () => {
      setAddNewMode(!addNewMode);
    }

    const handleSubmit = () => {
      const formattedDate = new Date(dateInput).toISOString().split('T')[0];
      const newRow = {description: descriptionInput, date: formattedDate}
      async function create() {
        try{
          await axios.post(`${apiUrl}/${id}/maintenances`, newRow); 
          const response = await axios.get(`${apiUrl}/${id}/maintenances`);
          const id= response.data[response.data.length -1].id;
          newRow.id = id;
        } catch(error) {
          console.error('could not generate new maintenance')
        }  
      }
      create();
      setMaintenanceRows((prevMaintenanceRows) => [...prevMaintenanceRows, newRow]);
    }

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    //date decrease by 1?
    const handleEditSubmit = (mainId) => {
      console.log(dateInput);
      const formattedDate = new Date(editDateInput).toISOString().split('T')[0];
      const updatedRows = maintenanceRows.map((row) => {
        const desc = editDescriptionInput === "" ? row.description : editDescriptionInput;
        return row.id === selectedRow ? { ...row, description: desc, date: formattedDate } : row;
      });
      const newRow = updatedRows.find((row) => row.id === selectedRow);
      async function edit() {
        try{
          await axios.put(`${apiUrl}/v1/${id}/maintenances/${mainId}`, newRow); 
        } catch(error) {
          console.error('could not edit maintenance')
        } 
        }
        edit();
        setMaintenanceRows(updatedRows);
        setEditDescriptionInput('');
        handleEdit(mainId);
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
                <button className="addNewButton" onClick={createNew}>Hide</button>
                <div>
                  <label>Description: </label>
                  <input type="text"  onChange={(e) => setDescriptionInput(e.target.value)} required></input>
                  <label>Date: </label>
                  <input type="date"   onChange={(e) => setDateInput(e.target.value)} required></input>
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
                      <td><input type="text" defaultValue={row.description} onChange={(e) => setEditDescriptionInput(e.target.value)}></input></td>
                      <td><input type="date" defaultValue={row.date} onChange={(e) => setEditDateInput(e.target.value)}></input></td>
                      <td><button className="secondary-button" onClick={() => handleEditSubmit(row.id)}>Confirm</button></td>
                      
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