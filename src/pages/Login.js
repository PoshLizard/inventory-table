import React, {useState} from 'react'
import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {

  const navigate = useNavigate();
  
 const apiUrl = process.env.REACT_APP_API_URL;
  const handleLogin = (e) => {
    e.preventDefault();

  
    navigate("/inventory");
  }

  const Register = (e) => {
    
    e.preventDefault();

    async function create() {
      try{
        console.log(apiUrl);
        await axios.post(`${apiUrl}/users`, {
            firstName: registerFirstName,
            lastName: registerLastName,
            email: registerEmail,
            password: registerPassword,
            role: 'USER'
        })
      } catch(error){
          setMessage('Account with email exists.');
      }
    }
    create();
  }

  const switchMode = () => {
    setDisplayMode(displayMode ? false: true);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayMode, setDisplayMode] = useState(true);
  const [message, setMessage] = useState('');

  const[registerFirstName, setRegisterFirstName] = useState('');
  const[registerLastName, setRegisterLastName] = useState('');
  const[registerPassword, setRegisterPassword] = useState('');
  const[registerEmail, setRegisterEmail] = useState('');


  return (
    <div className="login-page">
        <div>
          <form onSubmit={handleLogin} className='login-form' style={{display: displayMode ? 'flex' : 'none'}}>
            <img className="login-logo" src={logo} />
            <div>
              <label >Email: </label>
              <input onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label >Password: </label>
              <input onChange={(e) => setPassword(e.target.value) }></input>
            </div>
            <button type='submit'>Login</button>
            <p onClick={switchMode}>Dont have an account? Register Here.</p>
          </form>

          <form onSubmit={Register} id="register-form" className='login-form' style={{display: displayMode ? 'none' : 'flex'}}>
          <img className="login-logo" src={logo} />
            <div>
              <label >First Name: </label>
              <input onChange={(e) => setRegisterFirstName(e.target.value)}></input>
            </div>
            <div>
              <label>Last Name: </label>
              <input onChange={(e) => setRegisterLastName(e.target.value)}></input>
            </div>
            <div>
              <label>Email: </label>
              <input onChange={(e) => setRegisterEmail(e.target.value)}></input>
              {message}
            </div>
            <div>
              <label onChange={(e) => setRegisterPassword(e.target.value)}>Password: </label>
              <input></input>
            </div>
            <button type='submit'>Register</button>
            <p onClick={switchMode}>Already have an account? Login.</p>
          </form>
        </div>
        
         
    </div>
  )
}

export default Login