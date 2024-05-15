import React, {useState} from 'react'
import axios from 'axios'


const AddRowForm = ( { fetchData, setAddRowMode, addNewRow, selectedTable}) => {

  const tableFields = {
    Computers: ["assetTag", "serialNumber", "status", "brand", "model", "type", "color", "issuedTo", "grant", "charged"],
    Students: ["badge", "studentName", "location", "notes"],
    Supplies: ["sku" , "quantityInStock", "unit", "buildingLocation", "floor", "lockerArea", "reorderLevel", "reoderQuantity", "leadTimeForReorder", "vendor", "estimatedCost" ]
  };

    const apiUrl = process.env.REACT_APP_API_URL;
    const fields = tableFields[selectedTable] || [];
    const [newRowValues, setNewRowValues] = useState([]);

    const handleInputChange = (field, value) => {
      setNewRowValues((prev) => ({
        ...prev,
        [field]: value,
        }));
      };
        //remeber to move settablerows back into try block
      const handleCreate = (e) => {
        e.preventDefault();
        const newRow = { ...newRowValues };
        async function create() {
          try{
            if(selectedTable === "Computers") {
              console.log('1');
              await axios.post(`${apiUrl}/computers`, newRow);  
              console.log('2');
            } else if(selectedTable === "Students"){
              // await axios.post(`${apiUrl}/`, newRow);
            } else {
              await axios.post(`${apiUrl}/supplies`, newRow);
            }
            const response = await axios.get(`${apiUrl}/${selectedTable.toLowerCase()}`);
            const id= response.data[response.data.length -1].id;
            newRow.id = id;
            fetchData();
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
                  <div key={index}>
                    <label style={{textTransform: 'capitalize'}}>{field}: </label>
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