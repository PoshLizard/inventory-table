import React, { useEffect, useState} from "react";
import axios from 'axios';
import Maintenance from "./Maintenance";
import AddRowForm from "./AddRowForm";
import Loan from "./Loan";
const Table = ({
  tableRows,
  setTableRows,
  editRow,
  deleteRow,
  editMode,
  setEditMode,
  selectedRow,
}) => {
  
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editedRowValues, setEditedRowValues] = useState({});
  const [addRowMode, setAddRowMode] = useState(false);
  const [viewMainMode, setViewMainMode] = useState(false);
  const [viewLoanMode, setViewLoanMode] = useState(false);

  //current maintenance or loan id
  const [currentId, setCurrentId] = useState(0);
  //date
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Reset editedRowValues when edit mode changes
    if (!editMode) {
      setEditedRowValues({});
    }
  }, [editMode]);

  const addNewRow = () => {
    setAddRowMode(!addRowMode);
  }
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

  const viewMaintenance = (id) => {
    setCurrentId(id);
    setViewMainMode(!viewMainMode);
  }

  const viewLoan = (id) => {
    setCurrentId(id);
    setViewLoanMode(!viewLoanMode);
  }

  return (
    <div>
        <button onClick={addNewRow} className="addNewButton">
          Add New
        </button>
        {viewMainMode && <Maintenance tableRows={tableRows} viewMainMode={viewMainMode} id={currentId} viewMaintenance={viewMaintenance}/> }
        {viewLoanMode && <Loan tableRows={tableRows} viewLoanMode={viewLoanMode} id={currentId} viewLoan={viewLoan}/> }
        {addRowMode && <AddRowForm setTableRows={setTableRows} setAddRowMode={setAddRowMode} addNewRow={addNewRow} />}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Purchase Date</th>
            <th>Grant Issuer</th>
            <th>Asset #</th>
            <th>Serial #</th>
            <th>Storage Location</th>
            <th>Maintenance</th>
            <th>Loan</th>
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
                    onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                    defaultValue={row.storageLocation}
                    placeholder="Storage Location"
                  />
                </td> 
                <td>
                  <button onClick={(e) => viewMaintenance(e.target.value)}>Maintenance</button>
                </td>
                <td>
                  <button onClick={(e) => viewLoan(e.target.value)}>Loan</button>
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
                <td>{row.grantIssuer}</td>
                <td>{row.assetNumber}</td>
                <td>{row.serialNumber}</td>
                <td>{row.storageLocation}</td>
                <td><button onClick={() => viewMaintenance(row.id)}>Maintenance</button></td>
                <td><button onClick={() => viewLoan(row.id)}>Loan</button></td>
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
