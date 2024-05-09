import React, {useEffect, useState} from 'react'
import EditForm from './EditForm';

const SupplyTable = ({
    tableRows,
    editMode,
    selectedRow,
    handleInputChange,
    confirmEdit,
    editRow,
    deleteRow,
    currentId,
    setCurrentId
}
) => {

  const first = "sku";
  const second = "quantityInStock";
  const third = "unit";
  const fourth = "buildingLocation";
  const fifth = "floor";
  const sixth = "lockerArea";
  const seventh = "reorderLevel";
  const eighth = "reorderQuantity";
  const ninth = "leadTimeForReorder";
  const tenth = "vendor"
  const eleventh = "estimatedCost"

  useEffect(() => {
  }, [])

  return (
    <div>
        <table className="inventory-table">
            <thead>
            <tr>
                <th>Id</th>
                <th>SKU</th>
                <th>In Stock</th>
                <th>Unit</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Locker</th>
                <th>Reorder Level</th>
                <th>Reorder Quantity</th>
                <th>Lead time</th>
                <th>Vendor</th>
                <th>Estimated Cost</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tableRows.map((row) =>
                editMode === true && selectedRow === row.id ? (
                <EditForm 
                  row={row}
                  handleInputChange={handleInputChange}
                  confirmEdit={confirmEdit}
                  selectedTable="Supplies"
                />
                ) : ( 
                <tr>
                    <td>{row.id}</td>
                    <td>{row[first]}</td>
                    <td>{row[second]}</td>
                    <td>{row[third]}</td>
                    <td>{row[fourth]}</td>
                    <td>{row[fifth]}</td>
                    <td>{row[sixth]}</td>
                    <td>{row[seventh]}</td>
                    <td>{row[eighth]}</td>
                    <td>{row[ninth]}</td>
                    <td>{row[tenth]}</td>
                    <td>{row[eleventh]}</td>
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
  )
}

export default SupplyTable