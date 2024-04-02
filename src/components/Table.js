import React, {useRef} from 'react'

const Table = ( {tableRows, editRow, deleteRow, editMode, setEditMode, selectedRow} ) => {
    const nameInputRef = useRef();
    const unitsInputRef = useRef();
    const restockInputRef = useRef();
    const serialNumInputRef = useRef();
    const assetNumInputRef = useRef();
    const programInputRef = useRef();
    const loaneeInputRef = useRef();

    const confirmEdit = () =>{
        const name = nameInputRef.current.value;
        const units = unitsInputRef.current.value;
        const restock = restockInputRef.current.value;
        const serialNum = serialNumInputRef.current.value;
        const assetNum = assetNumInputRef.current.value;
        const program = programInputRef.current.value;
        const loanee = loaneeInputRef.current.value;
        tableRows[selectedRow -1].name = name;
        tableRows[selectedRow -1].units = units;
        tableRows[selectedRow -1].restock = restock;
        tableRows[selectedRow -1].serialNum = serialNum;
        tableRows[selectedRow -1].assetNum = assetNum;
        tableRows[selectedRow -1].program = program;
        tableRows[selectedRow -1].loanee = loanee;
        setEditMode(false);
    }
  return (
    <div>
        <table className='inventory-table'>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Units/Item</th>
                        <th>Restock</th>
                        <th>Serial #</th>
                        <th>Asset #</th>
                        <th>Program</th>
                        <th>Loanee</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            tableRows.map((row) => (
                                editMode === true && selectedRow === row.id ? (
                                  <tr className='editForm'>
                                    <td>{row.id}</td>
                                    <td><input ref={nameInputRef} defaultValue={row.name} placeholder="Name"/></td>
                                    <td><input ref={unitsInputRef} defaultValue={row.units} placeholder="Units"/></td>
                                    <td>
                                        <select ref={restockInputRef} defaultValue={row.restock}>
                                            <option>
                                                Yes
                                            </option>
                                            <option>
                                                No
                                            </option>
                                        </select>
                                    </td>
                                    <td><input ref={serialNumInputRef} defaultValue={row.serialNum} placeholder="Serial #"/></td>
                                    <td><input ref={assetNumInputRef} defaultValue={row.assetNum} placeholder="Asset #"/></td>
                                    <td><input ref={programInputRef} defaultValue={row.program} placeholder="Program"/></td>
                                    <td><input ref={loaneeInputRef} defaultValue={row.loanee} placeholder="Loanee"/></td>
                                    <td>
                                        <button onClick={() => confirmEdit()}>Confirm</button>
                                    </td>
                                  </tr>
                                ) : (
                                    <tr>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.units}</td>
                                    <td>{(row.restock) ? 'Yes' : 'No'}</td>
                                    <td>{row.serialNum}</td>
                                    <td>{row.assetNum}</td>
                                    <td>{row.program}</td>
                                    <td>{row.loanee}</td>
                                    <td>
                                        <button onClick={() => editRow(row.id)}>Edit</button>
                                        <button onClick={() => deleteRow(row.id)}>Delete</button>
                                    </td>
                                  </tr>
                                )
                            ))
                        }
                    </tbody>
                </table>
    </div>
  )
}

export default Table