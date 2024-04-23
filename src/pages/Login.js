import React, {useState} from 'react'
import logo from '../images/logo.png'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { doCreateUserWithEmailAndPassword, doSignInUserWithEmailAndPassword, currentUser} from '../auth';
const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  const [displayMode, setDisplayMode] = useState(true);
  const [loading, setLoading] = useState(false);
  //error message
  const [message, setMessage] = useState('');

  //login
  const[password, setPassword] = useState('');
  const[email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //register 
  const[registerFirstName, setRegisterFirstName] = useState('');
  const[registerLastName, setRegisterLastName] = useState('');
  const[registerPassword, setRegisterPassword] = useState('');
  const[registerEmail, setRegisterEmail] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => { 
    e.preventDefault();
    try{
      await doSignInUserWithEmailAndPassword(email, password);
      navigate("/inventory");
    }catch(error){
      setMessage('Email or password is invalid')
    }
  }
  const Register = async (e) => {
    e.preventDefault();

    async function create() {
    try {
      setMessage('');
      setLoading(true);
      await doCreateUserWithEmailAndPassword(registerEmail, registerPassword);
      await axios.post(`${apiUrl}/users`, {
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        password: registerPassword,
        role: 'USER'
      });
      switchMode();
    } catch (error) {
      setMessage('Account with email exists.');
    } finally {
      setLoading(false);
    }
  }
    await create(); // Wait for create() function to complete
    
  }
  const switchMode = () => {
    setDisplayMode(displayMode ? false: true);
  }

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
              <div style={{margin: '0'}}>
                <input onChange={(e) => setPassword(e.target.value) } type={showPassword ? "text" : "password"}></input>
                 <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ?  <i className="fa fa-eye"></i>: <i className="fa fa-eye-slash"></i>}
                </span>
              </div>
              <p onClick={() => navigate('/forgot-password')} style={{marginTop:'10px'}}>Forgot password?</p> 
            </div>
            <p className="error-msg">{message}</p>
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
              <p className="error-msg">{message}</p>
            </div>
            <div>
              <label >Password: </label>
              <input onChange={(e) => setRegisterPassword(e.target.value)} minLength={6}></input>
            </div>
            <button disabled={loading} type='submit'>Register</button>
            <p onClick={switchMode}>Already have an account? Login.</p>
          </form>
        </div> 
    </div>
  )
}

export default Login