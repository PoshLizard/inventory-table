
import editIcon from '../images/edit-icon.png'
import view from '../images/view.png'
import hide from '../images/hide.png'
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ProfileInformation(){
    const navigate = useNavigate();
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPass, setEditPass] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [pass, setPass] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [role, setRole] = useState();

   

    const nameEdit = (input) => {
        const updatedName = input.target.value;
        setName(updatedName);

        const nameParts = updatedName.split(" ");
        setFirst(nameParts[0]);
        setLast(nameParts[1]);
    }
    const emailEdit = (input) => {
        setEmail(input.target.value)
    }
    const passEdit = (input) => {
        setPass(input.target.value)
    }

    const toggleEditPass = () => {
        setEditPass(!editPass)
    }
    const toggleEditName = () => {
        setEditName(!editName)
    }
    const toggleEditEmail = () => {
        setEditEmail(!editEmail)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    function getProfile(){
        


        const auth = getAuth();
        const user = auth.currentUser.email;
        console.log(user)
        axios.get(`http://localhost:8080/api/v1/users/email/${user}`).then(function(response) {
            console.log(response);
            document.getElementById("profileInfoName").innerHTML = response.data.firstName + " " + response.data.lastName + "'s Profile";
            setId(response.data.id);
            setFirst(response.data.firstName);
            setLast(response.data.lastName);
            setEmail(response.data.email);
            setPass(response.data.password)
            setRole(response.data.role)

        }).catch(function(error){
            alert("Error Getting Profile, Please Refresh")
            console.log(error);
        })
    }
    
    function updateProfile() {
        
        const auth = getAuth();
        const user = auth.currentUser.email;
        const name = document.getElementById("profileInfoName").value;

        var updatedInfo = {
            id: id,
            firstName: first,
            lastName: last,
            email: email,
            password: pass,
            role: role
        }
        console.log(updatedInfo)
        console.log(id)
        axios.put(`http://localhost:8080/api/v1/users/${id}`,updatedInfo).catch(function(error) {
            alert("Unable to Update Profile")
            console.log(error);
        }).then(function () {
            auth.signOut();
            // getProfile();
            // alert("Profile Updated-reorder this then to not show");
        })
    }
   
    useEffect (() => {
        getProfile();
    }, [])
    

    return (
<div>
    <Header/>
    <div className='container'>
        <SideNav></SideNav>
        <div className='profileInfo'>
            <div className='profileHeaderBox'>
            <div>
                <h1 id='profileInfoName'></h1>
                <p id='profileInfoRole'>Role: {role}</p>
            </div>
            <h3>uid: {id}</h3>
            </div>
    
            <br></br>
            <hr></hr>
            <br></br>
            <div className='profileFields'>
                <div className='profileFieldBox'>
                {editName ? 
                (
                    <input type='text' placeholder={name} value={name} onChange={nameEdit}/>
                ) :
                    (<h1>{first} {last}</h1>)
                }
              
                <img className='profileLogo' src={editIcon} onClick={toggleEditName}/>
                </div>
                
                <div className='profileFieldBox'>
                <h3>Email: </h3>
                {editEmail ? (
                    <input 
                    type='text'
                    placeholder={email}
                    value={email}
                    onChange={emailEdit}
                    />
                )
                    : 
                    (<h3>{email}</h3>)
            }
                
               
                </div>
                <div className='profileFieldBox'>
      <h3>Password: </h3>
      {editPass ? (
        <input
          type="text"
          placeholder={pass}
          value={pass}
          onChange={passEdit}
        />
      ) : (
        showPassword ? (
          <h3>{pass}</h3>
        ) : (
          <h3>*******</h3>
        )
      )}
      <img
        className='profileLogo'
        src={showPassword ? hide : view}
        onClick={togglePasswordVisibility}
      />
                    

    </div>
    <p onClick={() => navigate('/forgot-password')} id='changePassLink'>Change password</p> 
              

               


                <button class="saveButton" onClick={() => updateProfile()}>Save Changes</button>
            </div>
            
             
        </div>
    </div>
</div> 
    )
}

export default ProfileInformation;