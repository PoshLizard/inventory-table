import React, { useEffect, useState } from "react";
import axios from "axios";
import Maintenance from "./Maintenance";
import AddRowForm from "./AddRowForm";
import Loan from "./Loan";
import LaptopTable from "./LaptopTable";
import InventorySearch from "./InventorySearch";
const Table = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editedRowValues, setEditedRowValues] = useState({});
  const [addRowMode, setAddRowMode] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Reset editedRowValues when edit mode changes
    if (!editMode) {
      setEditedRowValues({});
    }
  }, [editMode]);

  useEffect(() => {
    fetchData();
  }, []);
  const addNewRow = () => {
    setAddRowMode(!addRowMode);
  };
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
      row.id === selectedRow ? { ...row, ...editedRowValues } : row
    );
    async function update() {
      try {
        const newRow = updatedRows.find((row) => row.id === selectedRow);
        await axios.put(`${apiUrl}/items/${selectedRow}`, newRow);
        setTableRows(updatedRows);
      } catch (error) {
        console.error("something went wrong could not update");
      }
    }
    update();
    setEditMode(false);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`);
      const formattedData = response.data.map((item) => ({
        ...item,
        purchaseDate: item.purchaseDate
          ? new Date(item.purchaseDate).toISOString().split("T")[0]
          : null,
        lendingStartDate: item.lendingStartDate
          ? new Date(item.lendingStartDate).toISOString().split("T")[0]
          : null,
        lendingEndDate: item.lendingEndDate
          ? new Date(item.lendingEndDate).toISOString().split("T")[0]
          : null,
        maintenanceDate: item.maintenanceDate
          ? new Date(item.maintenanceDate).toISOString().split("T")[0]
          : null,
      }));
      setTableRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //editing
  const editRow = (id) => {
    setSelectedRow(id);
    setEditMode(true);
  };
  //deleting
  const deleteRow = (id) => {
    const newRows = tableRows.filter((tableRow) => tableRow.id !== id);
    async function handleDelete() {
      try {
        await axios.delete(`${apiUrl}/items/${id}`);
        setTableRows(newRows);
      } catch (error) {
        console.error("something went wrong could not delete");
      }
    }
    handleDelete();
  };

  const changeDisplayedTable = () => {

  }

  return (
    <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <label style={{fontSize:"1.2rem"}}>View: </label>
        <select onChange={changeDisplayedTable}>
        <option>Laptops</option>
        <option>Students</option>
        <option>Supplies</option>
      </select>
      <button onClick={addNewRow} className="addNewButton">
        Add New
      </button>
      </div>
      <div style={{width: '100%', display:'flex', justifyContent:"space-between"}}>
        <InventorySearch tableRows={tableRows} setTableRows={setTableRows} />
        <div></div>
      </div>
      {addRowMode && (
        <AddRowForm
          setTableRows={setTableRows}
          setAddRowMode={setAddRowMode}
          addNewRow={addNewRow}
        />
      )}
      <LaptopTable
        tableRows={tableRows}
        editMode={editMode}
        selectedRow={selectedRow}
        handleInputChange={handleInputChange}
        confirmEdit={confirmEdit}
        editRow={editRow}
        deleteRow={deleteRow}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default Table;
