import profileLogo from '../images/user-profile.png'
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function ProfileInformation(){

    function getProfile(){

        const auth = getAuth();
        const user = auth.currentUser.email;
    
        axios.get(`http://localhost:8080/api/v1/users/lookup?email=${user}`).then(function(response) {
            console.log(response);
            document.getElementById("profileInfoName").innerHTML = response.data.firstName + " " + response.data.lastName;
            document.getElementById("profileInfoRole").innerHTML = "Role: " + response.data.role;
        }).catch(function(error){
            alert("Error Getting Profile, Please Refresh")
            console.log(error);
        })
    }
    
    function updateProfile() {
    
        const auth = getAuth();
        const user = auth.currentUser.email;
    
        var updatedInfo = {
            // id: document.getElementById("profileInfoFirstName").innerHTML,
            firstName: document.getElementById("profileInfoFirstName").innerHTML,
            lastName: document.getElementById("profileInfoLastName").innerHTML,
            email: document.getElementById("profileInfoEmail").innerHTML,
            password: document.getElementById("profileInfoPassword").innerHTML,
            // role: document.getElementById("profileInfoRole").innerHTML,
        }
    
        axios.put(`http://localhost:8080/api/v1/users/lookup?email=${user}`,updatedInfo).catch(function(error) {
            alert("Unable to Update Profile")
            console.log(error);
        }).then(function () {
            getProfile();
            alert("Profile Updated-reorder this then to not show");
        })
    }
   
    getProfile();
    

    return (
<div>
    <Header/>
    <div className='container'>
        <SideNav></SideNav>
        <div className='profileInfo'>
            <img className='profileLogo' src={profileLogo} />
            <div>
                <h1 id='profileInfoName'></h1>
                <p id='profileInfoRole'>Role: </p>
            </div>
            
            <br></br>
            <hr></hr>
            <br></br>
            <div className='profileFields'>
                <label>First Name:</label>
                <input id="profileInfoFirstName"></input>

                <label>Last Name:</label>
                <input id="profileInfoLastName"></input>

                <label>Id:</label>
                <input id="profileInfoId"></input>

                <label>Email:</label>
                <input id="profileInfoEmail"></input>

                <label>Password:</label>
                <input id="profileInfoPassword"></input>

                <label>Role:</label>
                <input id="profileInfoRole"></input>

                <button onClick={() => updateProfile()}>Save</button>
            </div>
            
             
        </div>
    </div>
</div> 
    )
}

export default ProfileInformation;