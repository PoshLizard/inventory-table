import React, {useState} from 'react'
import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom";
import { doPasswordReset } from '../auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const[email, setEmail] = useState('');
  const[loading, setLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState(false);
  const forgotPassword = async (e) =>{
        e.preventDefault();
        try{
            setMessage('');
            setLoading(true);
            await doPasswordReset(email); 
            setEmailMsg(true);
        }catch(error){
            setMessage('Could not send email');
        }
        setLoading(false);
  }
  return (
    <div className='login-page'>
        <form onSubmit={forgotPassword} className='login-form'>
            <img className="login-logo" src={logo} alt='code different logo' />
            <div>
              <label >Email: </label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <p>{emailMsg ? 'Check your email for further instructions.' : ''}</p>
            <p className="error-msg">{message}</p>
            <button type='submit' disabled={loading}>Reset Password</button>
            <p onClick={() => navigate('/')}>Back to Login</p>
          </form>
    </div>
  )
}

export default ForgotPassword