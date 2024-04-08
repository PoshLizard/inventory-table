import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
        <header className='header'>
            <img className="logo" src={logo} />
            <div style={{
                          display: 'flex', 
                          justifyContent: 'space-evenly', 
                          width: '30%', 
                          fontSize: '2rem'
                        }}>
              <Link to={`/`}> Home </Link>
              <Link to={`/inventory`}> Inventory </Link>
              <Link to={`/dashboard`}> Dashboard </Link>
            </div>
            
        </header>
  )
}

export default Navbar