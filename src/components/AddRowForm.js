import React, {useState} from 'react'
import axios from 'axios'


const AddRowForm = ( { setTableRows, setAddRowMode, addNewRow}) => {

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
            <div className="newRowFormValues">
              <input onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Description" />
              <input onChange={(e) => handleInputChange('grantIssuer', e.target.value)} placeholder="Grant Issuer" />
              <input onChange={(e) => handleInputChange('assetNumber', e.target.value)} placeholder="Asset #" type="number"/>
              
            </div>
            <div className="newRowFormValues">
              <div>
                <input onChange={(e) => handleInputChange('serialNumber', e.target.value)} placeholder="Serial #" type="number"/>
              </div>
              <div>
                <input
                  onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                  placeholder="Storage Location"
                />
              </div>
              <div>
                <label>Purchase Date: </label>
                <input
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  type="date"
                  placeholder="Purchase Date"
                />
              </div>
            </div>
            </div>
            <button type="submit">Add Item</button>
          </form>
          </div>
  )
}

export default AddRowForm