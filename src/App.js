import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryTable from './pages/InventoryTable';
import Login from './pages/Login';
function App() {
  return (
    <Routes>    
      <Route path="/" element={<Login />}></Route>
      <Route path="/inventory" element={<InventoryTable />}/>
    </Routes>  
  );
    
}

export default App;
