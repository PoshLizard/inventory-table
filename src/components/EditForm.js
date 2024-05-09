import React from 'react';

const EditForm = ({ row, handleInputChange, confirmEdit, selectedTable }) => {
  const tableFields = {
    Laptops: ["assetTag", "serialNumber", "status", "brand", "model", "type", "color", "issuedTo", "grant", "charged", "maintenance", "loan"],
    Students: ["badge", "studentName", "location", "notes"],
    Supplies: ["sku" , "quantityInStock", "unit", "buildingLocation", "floor", "lockerArea", "reorderLevel", "reoderQuantity", "leadTimeForReorder", "vendor", "estimatedCost" ]
  };

  const fields = tableFields[selectedTable] || [];

  return (
    <tr className="editForm">
      <td>{row.id}</td>
      {fields.map((field, index) => (
        <td key={index}>
          <input
            onChange={(e) => handleInputChange(field, e.target.value)}
            defaultValue={row[field]}
            placeholder={row[field]}
          />
        </td>
      ))}
      <td>
        <button onClick={confirmEdit}>Confirm</button>
      </td>
    </tr>
  );
};

export default EditForm;