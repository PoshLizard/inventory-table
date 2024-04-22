import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { useAuth } from '../contexts/AuthContext'
import { doSignOut } from '../auth'

const SideNav = () => {
  const navigate = useNavigate();
  const { currentUser} = useAuth();
  const signout = async () => {
    try{
      await doSignOut();
      navigate('/');
      console.log(currentUser);
    }catch(error){
      console.error('could not sigh out')
    }
  }
  return (
    <div className="side-nav">
        <img className="logo" src={logo} />
        <div className="side-nav-links">
          <Link to={`/inventory`}> Inventory </Link>
          <Link to={`/dashboard`}> Dashboard </Link>
          <Link to={`/profile`}> Profile </Link>
          <button className="side-button" onClick={signout}>Sign out</button>
        </div>
        
    </div>
  )
}

export default SideNav