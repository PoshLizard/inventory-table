import React from 'react';

const EditForm = ({ row, handleInputChange, confirmEdit, selectedTable }) => {
  const tableFields = {
    Laptops: ["assetTag", "serialNumber", "status", "brand", "model", "type", "color", "issuedTo", "grantType", "chargedUpdated", "maintenance", "loan"],
    Students: ["badge", "studentName", "location", "notes"],
    Supplies: ["sku" , "quantityInStock", "unit", "buildingLocation", "floor", "lockerArea", "reorderLevel", "reoderQuantity", "leadTimeForReorder", "vendor", "estimatedCost" ]
  };

  const fields = tableFields[selectedTable] || [];

  return (
    <tr className="editForm">
      <td>{row.id}</td>
      {fields.map((field, index) => (
        <td key={index}>
          {field === "maintenance" || field ==="loan" || field==="status" || field==="issuedTo" ? <div /> : 
            field === "chargedUpdated" ? (
              <select defaultValue={row[field]} onChange={(e) => handleInputChange(field, e.target.value)}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select> ) : 
              <input
                onChange={(e) => handleInputChange(field, e.target.value)}
                defaultValue={row[field]}
                placeholder={row[field]}
              />
          }
        </td>
      ))}
      <td>
        <button onClick={confirmEdit}>Confirm</button>
      </td>
    </tr>
  );
};

export default EditForm;