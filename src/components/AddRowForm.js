import React, {useState} from 'react'
import axios from 'axios'


const AddRowForm = ( { setTableRows, setAddRowMode, addNewRow, selectedTable}) => {

  const tableFields = {
    Laptops: ["assetTag", "serialNumber", "status", "brand", "model", "type", "color", "issuedTo", "grant", "charged"],
    Students: ["badge", "studentName", "location", "notes"],
    Supplies: ["sku" , "quantityInStock", "unit", "buildingLocation", "floor", "lockerArea", "reorderLevel", "reoderQuantity", "leadTimeForReorder", "vendor", "estimatedCost" ]
  };

    const fields = tableFields[selectedTable] || [];

    const apiUrl = process.env.REACT_APP_API_URL;
      const [newRowValues, setNewRowValues] = useState({})

      const handleInputChange = (field, value) => {
        setNewRowValues((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

      const handleCreate = (e) => {
        e.preventDefault();
        const newRow = { ...newRowValues };
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
    <div className="modal-background">
          <form className="newRowForm" onSubmit={handleCreate}>
            <h1>Add New Entry</h1>
            <button onClick={addNewRow} className="addNewButton">Cancel</button>
            <div className="newRowFormContainer">
                {fields.map((field, index) => (
                  <div>
                  <label>{field}</label>
                  <input onChange={(e) => handleInputChange(field, e.target.value)}>
                  </input>
                  </div>
                )) }
            </div>
            <button className="addNewButton" type="submit">Add Item</button>
          </form>
          </div>
  )
}

export default AddRowForm