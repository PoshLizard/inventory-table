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
      fetchData();
    }, []);

    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/computers/${id}`); 
        const mainData = response.data.maintenances;  
          if(Array.isArray(mainData) && mainData.length === 0){
            setMaintenanceRows([]);
          }else{
            const maintenanceRowsWithIsoDates = mainData.map(maintenance => ({
              ...maintenance,
              date: new Date(maintenance.date).toISOString().split('T')[0]
            }));
            setMaintenanceRows(maintenanceRowsWithIsoDates);
          }
      } catch (error) {
        console.error('Could not retrieve maintenances', error);
      }
    }

    const createNew = () => {
      setAddNewMode(!addNewMode);
    }  
    
    const handleSubmit = () => {
      const formattedDate = new Date(dateInput).toISOString().split('T')[0];
      const newRow = { description: descriptionInput, date: formattedDate}
      create(newRow);
    }

    async function create(newRow) {
      try{
        //adjust api call later
        await axios.put(`${apiUrl}/maintenances/appendMaintenance/${id}`, newRow); 
        fetchData(); 
      } catch(error) {
        console.error('could not generate new maintenance')
      }  
    }

  

    const handleEdit = (id) => {
      setEditMode(!editMode);
      setSelectedRow(id);
    }

    //date decrease by 1?
    const handleEditSubmit = (mainId) => {
      const formattedDate = new Date(editDateInput).toISOString().split('T')[0];
      const updatedRows = maintenanceRows.map((row) => {
        const desc = editDescriptionInput === "" ? row.description : editDescriptionInput;
        return row.id === selectedRow ? { ...row, description: desc, date: formattedDate } : row;
      });
      const newRow = updatedRows.find((row) => row.id === selectedRow);
      async function edit() {
        try{
          await axios.put(`${apiUrl}/maintenances/appendMaintenance/${id}`, newRow); 
          setEditDescriptionInput('');
          handleEdit(mainId);
          fetchData();
        } catch(error) {
          console.error('could not edit maintenance')
        } 
        }
        edit();
      }

    const handleDelete = (id) => {
        async function deleteMain() {
          try{
            await axios.delete(`${apiUrl}/maintenances/${id}`)
            fetchData();
          } catch(error) {
            console.error("could not delete maintenance");
          }
        }
      deleteMain();
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
              <thead>
                <th>ID </th>
                <th>Description</th>
                <th>Date</th>
              </thead>
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