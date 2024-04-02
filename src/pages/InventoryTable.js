import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Table from '../components/Table';
import InventorySearch from '../components/InventorySearch';
const InventoryTable = () => {
    const [tableRows, setTableRows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);

    const tableData = [
        {id: 1, name: 'Macbookadfdsadfdsfasdfasdfasdf', units: 4, restock: false, serialNum: '3232', assetNum: '3433', program: 'NCC', loanee: 'Bob'},
        {id: 2, name: 'Charger', units: 3, restock: true, serialNum: '3212', assetNum: '3233', program: 'NCC', loanee: 'Steve'}
    ]

    useEffect(()=> {
        setTableRows(tableData);
    }, [])

    
     //editing 
     
     const editRow = (id) => {
        setSelectedRow(id);
        setEditMode(true);
    }
    //deleting
    const deleteRow = (id) => {
        const newRows = tableRows.filter(tableRow => tableRow.id !== id);
        setTableRows(newRows);
    }

    

  return (
    <div className='inventory'>
        <Header />
        <div className='container'>
        <SideNav />
        <div className='content'>
            <h1 style={{fontSize:'4rem', marginTop:'30px'}}>INVENTORY</h1>
                <InventorySearch 
                    tableData={tableData} 
                    setTableRows={setTableRows}
                /> 
                <Table 
                    tableRows={tableRows}
                    editRow={editRow}
                    deleteRow={deleteRow}
                    selectedRow={selectedRow}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
        </div>
    </div>
  )
}

export default InventoryTable;