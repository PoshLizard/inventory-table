import React, { useRef, useState } from 'react';

const Table = ({
  tableRows,
  setTableRows,
  editRow,
  deleteRow,
  editMode,
  setEditMode,
  selectedRow,
  addNewRow,
  addRowMode,
  setAddRowMode,
}) => {
  const descriptionInputRef = useRef();
  const purchaseDateInputRef = useRef();
  const lendStartInputRef = useRef();
  const lendEndInputRef = useRef();
  const grantIssuerInputRef = useRef();
  const assetNumInputRef = useRef();
  const serialNumInputRef = useRef();
  const maintenanceDateInputRef = useRef();
  const storageLocationInputRef = useRef();

  //date
  const currentDate = new Date().toISOString().split('T')[0];

  //editing existing rows
  const confirmEdit = () => {
    const description = descriptionInputRef.current.value;
    const purchaseDate = purchaseDateInputRef.current.value;
    const lendStart = lendStartInputRef.current.value;
    const lendEnd = lendEndInputRef.current.value;
    const grantIssuer = grantIssuerInputRef.current.value;
    const assetNum = assetNumInputRef.current.value;
    const serialNum = serialNumInputRef.current.value;
    const maintenanceDate = maintenanceDateInputRef.current.value;
    const storageLocation = storageLocationInputRef.current.value;

    const updatedRows = tableRows.map(row => {
      if (row.id === selectedRow) {
        return {
          ...row,
          description,
          purchaseDate,
          lendStart,
          lendEnd,
          grantIssuer,
          assetNum,
          serialNum,
          maintenanceDate,
          storageLocation,
        };
      }
      return row;
    });

    setTableRows(updatedRows);
    setEditMode(false);
  };

  //adding new rows
  const handleSubmit = e => {
    e.preventDefault();
    const description = descriptionInputRef.current.value;
    const purchaseDate = purchaseDateInputRef.current.value;
    const lendStart = lendStartInputRef.current.value;
    const lendEnd = lendEndInputRef.current.value;
    const grantIssuer = grantIssuerInputRef.current.value;
    const assetNum = assetNumInputRef.current.value;
    const serialNum = serialNumInputRef.current.value;
    const maintenanceDate = maintenanceDateInputRef.current.value;
    const storageLocation = storageLocationInputRef.current.value;
    const id = tableRows.length + 1;
    const newRow = {
      id,
      description,
      purchaseDate,
      lendStart,
      lendEnd,
      grantIssuer,
      assetNum,
      serialNum,
      maintenanceDate,
      storageLocation,
    };
    setTableRows([...tableRows, newRow]);
    setAddRowMode(false);
  };

  return (
    <div>
      <button onClick={addNewRow} className='addNewButton'>
        Add New
      </button>
      {
        //when in addRowmode will show this form
        addRowMode && (
        <form className='newRowForm' onSubmit={handleSubmit}>
            <div>
                <input ref={descriptionInputRef} placeholder='Description' />
                <input ref={grantIssuerInputRef} placeholder='Grant Issuer' />
                <input ref={assetNumInputRef} placeholder='Asset #' />
                <input ref={serialNumInputRef} placeholder='Serial #' />
                <input ref={storageLocationInputRef} placeholder='Storage Location' />
            </div>
            <div>
                <div>
                    <label>Purchase Date: </label>
                    <input ref={purchaseDateInputRef} type='date' defaultValue={currentDate} placeholder='Purchase Date' />
                </div>
                <div>
                    <label>Lend Start: </label>
                    <input ref={lendStartInputRef} type='date' defaultValue={currentDate} placeholder='Lend Start' />
                </div>
                <div>
                    <label>Lend End: </label>
                    <input ref={lendEndInputRef} type='date' defaultValue={currentDate} placeholder='Lend End' />
                </div>
                <div>
                    <label>Maintenance Date: </label>
                    <input ref={maintenanceDateInputRef} defaultValue={currentDate} type='date'/>
                </div>
            </div>          
          <button type='submit'>Submit</button>
        </form>
      )}
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Purchase Date</th>
            <th>Lend Start</th>
            <th>Lend End</th>
            <th>Grant Issuer</th>
            <th>Asset #</th>
            <th>Serial #</th>
            <th>Maintenance Date</th>
            <th>Storage Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(row =>
            editMode === true && selectedRow === row.id ? (
              <tr className='editForm'>
                <td>{row.id}</td>
                <td>
                  <input ref={descriptionInputRef} defaultValue={row.description} placeholder='Description' />
                </td>
                <td>
                  <input ref={purchaseDateInputRef} type='date' defaultValue={row.purchaseDate} />
                </td>
                <td>
                  <input ref={lendStartInputRef} type='date' defaultValue={row.lendStart} />
                </td>
                <td>
                  <input ref={lendEndInputRef} type='date' defaultValue={row.lendEnd} />
                </td>
                <td>
                  <input ref={grantIssuerInputRef} defaultValue={row.grantIssuer} placeholder='Grant Issuer' />
                </td>
                <td>
                  <input ref={assetNumInputRef} defaultValue={row.assetNum} placeholder='Asset #' />
                </td>
                <td>
                  <input ref={serialNumInputRef} defaultValue={row.serialNum} placeholder='Serial #' />
                </td>
                <td>
                  <input ref={maintenanceDateInputRef} type='date' defaultValue={row.maintenanceDate} placeholder='Maintenance Date' />
                </td>
                <td>
                  <input ref={storageLocationInputRef} defaultValue={row.storageLocation} placeholder='Storage Location' />
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
                <td>{row.lendStart}</td>
                <td>{row.lendEnd}</td>
                <td>{row.grantIssuer}</td>
                <td>{row.assetNum}</td>
                <td>{row.serialNum}</td>
                <td>{row.maintenanceDate}</td>
                <td>{row.storageLocation}</td>
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
  );
};

export default Table;
