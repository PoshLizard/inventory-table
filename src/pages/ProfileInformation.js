import profileLogo from '../images/user-profile.png'
import Header from '../components/Header';
import SideNav from '../components/SideNav';

function ProfileInformation(){
    return (
<div>
    <div>
         <Header/>
         <SideNav></SideNav>
    </div>
        

    <div>
        <div id='profileHeader'>
            
            <img style={{display:'inline-block'}} className='profileLogo' src={profileLogo} />
            <div style={{display:'inline-block'}}>
                <h1>Tunmise Kehinde</h1>
                <p>Role: Manager</p>
            </div>
            
        </div>
        
        <div>
            <div>
                <label>First Name:</label>
                <input></input>
            </div>
            
            <div>
                <label>Last Name:</label>
                <input></input>
            </div>
            
            <div>
                <label>Email:</label>
                <input></input>
            </div>
            
            <div>
                 <label>Reset Password:</label>
                 <input></input>
            </div>

            <button>Save</button>
        </div>
    </div>
</div>
    

    
    
        
    )
}

export default ProfileInformation;