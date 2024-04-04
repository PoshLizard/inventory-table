import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Table from '../components/Table';
import InventorySearch from '../components/InventorySearch';
import axios from 'axios';

const InventoryTable = () => {
    const [tableRows, setTableRows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [addRowMode, setAddRowMode] = useState(false);
    const tableData = [
        {
            id: 1,
            name: 'Macbf',
            purchaseDate: new Date().toISOString(),
            lendingStartDate: new Date().toISOString(),
            lendingEndDate: new Date().toISOString(),
            grantIssuer: '3433',
            assetNumber: '123',
            serialNumber: '123',
            description: 'hlelelele',
            maintenanceDate: 'fd',
            storageLocation: 'where',
          },
          {
            id: 2,
            name: 'Macbf',
            purchaseDate: new Date().toISOString(),
            lendingStartDate: new Date().toISOString(),
            lendingEndDate: new Date().toISOString(),
            grantIssuer: '3433',
            assetNumber: '123',
            serialNumber: '123',
            description: 'hlelelele',
            maintenanceDate: 'fd',
            storageLocation: 'where',
          },
          {
            id: 3,
            name: 'Macbf',
            purchaseDate: new Date().toISOString(),
            lendingStartDate: new Date().toISOString(),
            lendingEndDate: new Date().toISOString(),
            grantIssuer: '3433',
            assetNumber: '123',
            serialNumber: '123',
            description: 'hlelelele',
            maintenanceDate: 'fd',
            storageLocation: 'where',
          }
        
    ]

    useEffect(()=> {
        setTableRows(tableData);
    }, [])

    //need to be configured
    const backendURL = '';

    //update the backend
    useEffect(() => {
        console.log(tableRows);
        
        
        // axios.post(`${backendURL}/update-inventory`, {tableRows})
        //     .then(response => {
        //         console.log('Backend updated succesfully:', response.data);
        //     })
        //     .catch(error=> {
        //         console.error('Error updating the backend', error);
        //     });
    }, [tableRows]); 

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

    const addNewRow = () => {
        setAddRowMode(true);
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
                    setTableRows={setTableRows}
                    editRow={editRow}
                    deleteRow={deleteRow}
                    selectedRow={selectedRow}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    addRowMode={addRowMode}
                    setAddRowMode={setAddRowMode}
                    addNewRow={addNewRow}
                />
            </div>
        </div>
    </div>
  )
}

export default InventoryTable;