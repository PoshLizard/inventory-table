import React, {useEffect, useState} from 'react'
import Loan from './Loan';
import Maintenance from './Maintenance';
import EditForm from './EditForm';

const LaptopTable = ({
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
  const first = "assetTag";
  const second = "serialNumber";
  const third = "status";
  const fourth = "brand";
  const fifth = "model";
  const sixth = "type";
  const seventh = "color";
  const eighth = "issuedTo";
  const ninth = "grant";

  useEffect(() => {
  }, [])

  return (
    <div>
        <table className="inventory-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Asset Tag</th>
                <th>Serial #</th>
                <th>Status</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Type</th>
                <th>Color</th>
                <th>Issued to</th>
                <th>Grant</th>
                <th>Charged/Updated</th>
            </tr>
            </thead>
            <tbody>
            {tableRows.map((row) =>
                editMode === true && selectedRow === row.id ? (
                <EditForm 
                  row={row}
                  handleInputChange={handleInputChange}
                  confirmEdit={confirmEdit}
                  selectedTable="Laptops"
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

export default LaptopTable