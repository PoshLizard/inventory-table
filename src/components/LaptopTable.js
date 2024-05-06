import React, {useState} from 'react'
import Loan from './Loan';
import Maintenance from './Maintenance';

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

  const [viewMainMode, setViewMainMode] = useState(false);
  const [viewLoanMode, setViewLoanMode] = useState(false);

  const viewMaintenance = (id) => {
    setCurrentId(id);
    setViewMainMode(!viewMainMode);
  };

  const viewLoan = (id) => {
    setCurrentId(id);
    setViewLoanMode(!viewLoanMode);
  };
  return (
    <div>
        {viewMainMode && (
        <Maintenance
          tableRows={tableRows}
          viewMainMode={viewMainMode}
          id={currentId}
          viewMaintenance={viewMaintenance}
        />
      )}
      {viewLoanMode && (
        <Loan
          tableRows={tableRows}
          viewLoanMode={viewLoanMode}
          id={currentId}
          viewLoan={viewLoan}
        />
      )}
        <table className="inventory-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Purchase Date</th>
                <th>Grant Issuer</th>
                <th>Asset #</th>
                <th>Serial #</th>
                <th>Storage Location</th>
                <th>Maintenance</th>
                <th>Loan</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tableRows.map((row) =>
                editMode === true && selectedRow === row.id ? (
                <tr className="editForm">
                    <td>{row.id}</td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        defaultValue={row.description}
                        placeholder="Description"
                    />
                    </td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                        type="date"
                        defaultValue={row.purchaseDate}
                    />
                    </td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('grantIssuer', e.target.value)}
                        defaultValue={row.grantIssuer}
                        placeholder="Grant Issuer"
                    />
                    </td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('assetNumber', e.target.value)}
                        defaultValue={row.assetNumber}
                        placeholder="Asset #"
                    />
                    </td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                        defaultValue={row.serialNumber}
                        placeholder="Serial #"
                    />
                    </td>
                    <td>
                    <input
                        onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                        defaultValue={row.storageLocation}
                        placeholder="Storage Location"
                    />
                    </td> 
                    <td>
                    <button onClick={(e) => viewMaintenance(e.target.value)}>Maintenance</button>
                    </td>
                    <td>
                    <button onClick={(e) => viewLoan(e.target.value)}>Loan</button>
                    </td>
                    <td>
                    <button onClick={confirmEdit}>Confirm</button>
                    </td>
                </tr>
                ) : (
                
                <tr>
                    <td>{row.id}</td>
                    <td>{row.description}</td>
                    <td>{row.purchaseDate}</td>
                    <td>{row.grantIssuer}</td>
                    <td>{row.assetNumber}</td>
                    <td>{row.serialNumber}</td>
                    <td>{row.storageLocation}</td>
                    <td><button onClick={() => viewMaintenance(row.id)}>Maintenance</button></td>
                    <td><button onClick={() => viewLoan(row.id)}>Loan</button></td>
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