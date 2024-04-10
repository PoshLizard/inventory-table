import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryTable from './pages/InventoryTable';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Routes>    
      <Route path="/" element={<Login />}></Route>
      <Route path="/inventory" element={<InventoryTable />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>  
  );
    
}

export default App;
