import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryTable from './pages/InventoryTable';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileInformation from './pages/ProfileInformation';
function App() {
  return (
    <Routes>    
      <Route path="/" element={<Login />}></Route>
      <Route path="/inventory" element={<InventoryTable />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/profile" element={<ProfileInformation/>}/>
    </Routes>  
  );
    
}

export default App;
