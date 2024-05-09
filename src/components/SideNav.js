import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import hamburger from '../images/hamburger.png'
import inventoryIcon from '../images/inventory.png'
import dashboardIcon from '../images/dashboard.jpg'
import userIcon from '../images/user-profile.png'
import logoutIcon from '../images/logout.png'
import { useAuth } from '../contexts/AuthContext'
import { doSignOut } from '../auth'

const SideNav = () => {
  const [display, setDisplay] = useState();
  const navigate = useNavigate();
  const { currentUser} = useAuth();
  const signout = async () => {
    try{
      await doSignOut();
      navigate('/');
      console.log(currentUser);
    }catch(error){
      console.error('Could not sign out')
    }
  }
  return (
    <div> 
      {display ? (
      <div className="side-nav">
        <img className="logo" src={logo}/>
        <div className="side-nav-links">
          <div style={{display:'flex', justifyContent:"space-between"}}>
            <div></div>
            <img className="hamburger" src={hamburger} onClick={() => setDisplay(false)}></img>
          </div>
          <Link to={`/inventory`}> Inventory </Link>
          <Link to={`/dashboard`}> Dashboard </Link>
          <Link to={`/profile`}> Profile </Link>
          <button className="side-button" onClick={signout}>Sign out</button>
        </div>
      </div>) : (
      <div className="side-nav-collapsed">
          <div style={{height: '173px'}}></div>
          <img className="hamburger" src={hamburger} onClick={() => setDisplay(true)}/>
          <Link to={`/inventory`}><img className="hamburger" src={inventoryIcon} /></Link>
          <Link to={`/dashboard`}><img className="hamburger" src={dashboardIcon} /></Link>
          <Link to={`/profile`}><img className="hamburger" src={userIcon} /></Link>
          <img className="hamburger" src={logoutIcon} onClick={signout}></img>
      </div>)
    }
    </div>
    
  )
}

export default SideNav