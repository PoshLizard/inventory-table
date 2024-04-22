import React, { useEffect, useState} from "react";
import axios from 'axios';
const Table = ({
  tableRows,
  setTableRows,
  editRow,
  deleteRow,
  editMode,
  setEditMode,
  selectedRow,
  addNewRow,
  addRowMode,
  setAddRowMode,
}) => {
  
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editedRowValues, setEditedRowValues] = useState({});

  //date
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Reset editedRowValues when edit mode changes
    if (!editMode) {
      setEditedRowValues({});
    }
  }, [editMode]);

  const handleInputChange = (field, value) => {
    setEditedRowValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //editing existing rows
  const confirmEdit = () => {
    //searches for selectedRow and edits the values that have been changed.
    const updatedRows = tableRows.map((row) =>
    row.id === selectedRow ? { ...row, ...editedRowValues } : row );
    async function update() {
      try{
        const newRow = updatedRows.find((row) => row.id === selectedRow);
        await axios.put(`${apiUrl}/items/${selectedRow}`, newRow);
        setTableRows(updatedRows);
      }catch(error){
        console.error('something went wrong could not update');
      }
    }
    update();
    setEditMode(false);
  };

  //adding new rows
  const handleCreate = (e) => {
    e.preventDefault();
    const newRow = { ...editedRowValues };
    async function create() {
      try{
        await axios.post(`${apiUrl}/items`, newRow);    
        const response = await axios.get(`${apiUrl}/items`);
        const id= response.data[response.data.length -1].id;
        newRow.id = id;
        setTableRows((prevRows) => [...prevRows, newRow]);
      }catch(error){
          console.error('something went wrong could not create');
      }
    }
    create();
    setAddRowMode(false);
  };

  return (
    <div>
        <button onClick={addNewRow} className="addNewButton">
         Add New
         </button>
        {addRowMode && (
          <div className="modal-background">
          <form className="newRowForm" onSubmit={handleCreate}>
            <h1>Add New Entry</h1>
            <button onClick={addNewRow} className="addNewButton">Cancel</button>
            <div className="newRowFormContainer">
            <div className="newRowFormValues">
              <input onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Description" />
              <input onChange={(e) => handleInputChange('grantIssuer', e.target.value)} placeholder="Grant Issuer" />
              <input onChange={(e) => handleInputChange('assetNumber', e.target.value)} placeholder="Asset #" type="number"/>
              <input onChange={(e) => handleInputChange('serialNumber', e.target.value)} placeholder="Serial #" type="number"/>
              <input
                onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                placeholder="Storage Location"
              />
            </div>
            <div className="newRowFormValues">
              <div>
                <label>Purchase Date: </label>
                <input
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  type="date"
                  placeholder="Purchase Date"
                />
              </div>
              <div>
                <label>Lend Start: </label>
                <input
                  onChange={(e) => handleInputChange('lendingStartDate', e.target.value)}
                  type="date"
                  placeholder="Lend Start"
                />
              </div>
              <div>
                <label>Lend End: </label>
                <input
                  onChange={(e) => handleInputChange('lendingEndDate', e.target.value)}
                  type="date"
                  placeholder="Lend End"
                />
              </div>
              <div>
                <label>Maintenance Date: </label>
                <input
                  onChange={(e) => handleInputChange('maintenanceDate', e.target.value)}
                  type="date"
                />
              </div>
            </div>
            </div>
            <button type="submit">Add Item</button>
          </form>
          </div>
        )
}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Purchase Date</th>
            <th>Lend Start</th>
            <th>Lend End</th>
            <th>Grant Issuer</th>
            <th>Asset #</th>
            <th>Serial #</th>
            <th>Maintenance Date</th>
            <th>Storage Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) =>
            editMode === true && selectedRow === row.id ? (
              <tr className="editForm">
                <td>{row.id}</td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    defaultValue={row.description}
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    type="date"
                    defaultValue={row.purchaseDate}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('lendingStartDate', e.target.value)}
                    type="date"
                    defaultValue={row.lendingStartDate}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('lendingEndDate', e.target.value)}
                    type="date"
                    defaultValue={row.lendingEndDate}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('grantIssuer', e.target.value)}
                    defaultValue={row.grantIssuer}
                    placeholder="Grant Issuer"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('assetNumber', e.target.value)}
                    defaultValue={row.assetNumber}
                    placeholder="Asset #"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    defaultValue={row.serialNumber}
                    placeholder="Serial #"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('maintenanceDate', e.target.value)}
                    type="date"
                    defaultValue={row.maintenanceDate}
                    placeholder="Maintenance Date"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                    defaultValue={row.storageLocation}
                    placeholder="Storage Location"
                  />
                </td>
                <td>
                  <button onClick={confirmEdit}>Confirm</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>{row.id}</td>
                <td>{row.description}</td>
                <td>{row.purchaseDate}</td>
                <td>{row.lendingStartDate}</td>
                <td>{row.lendingEndDate}</td>
                <td>{row.grantIssuer}</td>
                <td>{row.assetNumber}</td>
                <td>{row.serialNumber}</td>
                <td>{row.maintenanceDate}</td>
                <td>{row.storageLocation}</td>
                <td>
                  <button onClick={() => editRow(row.id)}>Edit</button>
                  <button onClick={() => deleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
