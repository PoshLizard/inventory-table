import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
const SideNav = () => {
  return (
    <div className="side-nav">
        <img className="logo" src={logo} />
        <div className="side-nav-links">
          <Link to={`/`}> Home </Link>
          <Link to={`/inventory`}> Inventory </Link>
        </div>
        
    </div>
  )
}

export default SideNav