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

    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(()=> {
        const fetchData = async () => {
            try {
        
                const response = await axios.get(`${apiUrl}/items`);
                const formattedData = response.data.map(item => ({
                ...item,
                purchaseDate : item.purchaseDate ? new Date(item.purchaseDate).toISOString().split("T")[0] : null,
                lendingStartDate: item.lendingStartDate ? new Date(item.lendingStartDate).toISOString().split('T')[0]: null,
                lendingEndDate: item.lendingEndDate ? new Date(item.lendingEndDate).toISOString().split('T')[0] : null,
                maintenanceDate: item.maintenanceDate ? new Date(item.maintenanceDate).toISOString().split('T')[0] : null
            }));
                setTableRows(formattedData);
        
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

     //editing 
    const editRow = (id) => {
        setSelectedRow(id);
        setEditMode(true);
    }
    //deleting
    const deleteRow = (id) => {
        const newRows = tableRows.filter(tableRow => tableRow.id !== id);
        async function handleDelete() {
            try{
                await axios.delete(`${apiUrl}/items/${id}`);
                setTableRows(newRows);
            }catch(error){
                console.error("something went wrong could not delete")
            }
        }
        handleDelete();
    }

    const addNewRow = () => {
        setAddRowMode(!addRowMode);
    }

  return (
    <div className='inventory'>
        <Header />
        <div className='container'>
        <SideNav />
        <div className='content'>
            <h1 style={{fontSize:'4rem', marginTop:'30px'}}>INVENTORY</h1>
                <InventorySearch 
                    tableRows={tableRows}
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