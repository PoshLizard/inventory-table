import React, {useState} from 'react'
import EditForm from './EditForm'

const StudentTable = ({
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
  return (
    <div>
        <table className="inventory-table">
            <thead>
            <tr>
                <th>Badge</th>
                <th>Student Name</th>
                <th>Location</th>
                <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            {tableRows.map((row) =>
                editMode === true && selectedRow === row.id ? (
                <EditForm 
                  row={row}
                  handleInputChange={handleInputChange}
                  confirmEdit={confirmEdit}
                  selectedTable="Students"
                />
                ) : (
                <tr>
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

export default StudentTable