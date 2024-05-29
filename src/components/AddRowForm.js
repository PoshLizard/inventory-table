import React, {useState} from 'react'
import axios from 'axios'


const AddRowForm = ( { fetchData, setAddRowMode, addNewRow, selectedTable}) => {

  const tableFields = {
    Computers: ["assetTag", "serialNumber", "brand", "model", "type", "color", "grantType", "chargedUpdated"],
    Students: ["badgeName", "studentName", "location", "notes"],
    Supplies: ["sku" , "quantityInStock", "unit", "buildingLocation", "floor", "lockerArea", "reorderLevel", "reoderQuantity", "leadTimeForReorder", "vendor", "estimatedCost" ]
  };

  const tableDisplayFields = {
    Computers: ["Asset Tag", "Serial Number", "Brand", "Model", "Type", "Color", "Grant", "Charged"],
    Students: ["Badge Name", "Student Name", "Location", "Notes"],
    Supplies: ["SKU" , "Quantity In Stock", "Unit", "Building Location", "Floor", "Locker Area", "Reorder Level", "Reoder Quantity", "Lead Time For Reorder", "Vendor", "Estimated Cost" ]
  };

    const apiUrl = process.env.REACT_APP_API_URL;
    const fields = tableFields[selectedTable] || [];
    const displayFields = tableDisplayFields[selectedTable] || [];
    const [newRowValues, setNewRowValues] = useState([]);

    const handleInputChange = (field, value) => {
      setNewRowValues((prev) => ({
        ...prev,
        [field]: value,
        }));
      };
    
      const handleCreate = (e) => {
        e.preventDefault();
        const newRow = { ...newRowValues, status: 'Available', issuedTo: 'N/A', chargedUpdated: newRowValues.chargedUpdated === undefined? 'Yes' : newRowValues.chargedUpdated };
        console.log(newRow);
        async function create() {
          try{
            if(selectedTable === "Computers") {
              
              await axios.post(`${apiUrl}/computers`, newRow);  
           
            } else if(selectedTable === "Students"){
              await axios.post(`${apiUrl}/students`, newRow);
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
            <div className="newRowFormContainer">
                {fields.map((field, index) => (
                  <div key={index}>
                    <label style={{textTransform: 'capitalize'}}>{displayFields[index]}: </label>
                    {field === "chargedUpdated" ? (
                        <select  onChange={(e) => handleInputChange(field, e.target.value)}>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : 
                      field ==="notes" ? 
                      <textarea onChange={(e) => handleInputChange(field, e.target.value)} className="notesText"  rows="4" cols="30" placeholder="Enter your notes..."></textarea> :
                      (
                        <input type={field === "quantityInStock" || 
                          field === "reorderLevel" || 
                          field === "reorderQuantity" || 
                          field ==="leadTimeForReorder" || 
                          field ==="estimatedCost" ? 'number' : 'text'}
                          maxLength={100}
                          onChange={(e) => handleInputChange(field, e.target.value)} 
                        />
                      )}
                  </div>
                )) }
            </div>
            <div>
              <button style={{margin: "0 30px"}} onClick={addNewRow} className="addNewButton">Cancel</button>
              <button className="addNewButton" type="submit">Add Item</button>
            </div>
          </form>
          </div>
  )
}

export default AddRowForm