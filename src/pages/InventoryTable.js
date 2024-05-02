import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Table from '../components/Table';
import InventorySearch from '../components/InventorySearch';
import axios from 'axios';

const InventoryTable = () => {
  return (
    <div className='inventory'>
        <Header />
        <div className='container'>
        <SideNav />
        <div className='content'>
            <h1 style={{fontSize:'4rem', marginTop:'30px'}}>INVENTORY</h1>
                <Table />
            </div>
        </div>
    </div>
  )
}

export default InventoryTable;