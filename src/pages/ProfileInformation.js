import profileLogo from '../images/user-profile.png'
import Header from '../components/Header';
import SideNav from '../components/SideNav';

const ProfileInformation = () => {
    return (
<div>
    <Header/>
    <div className='container'>
        <SideNav></SideNav>
        <div className='profileInfo'>
            <img className='profileLogo' src={profileLogo} />
            <div>
                <h1>Tunmise Kehinde</h1>
                <p>Role: Manager</p>
            </div>
            
            <br></br>
            <hr></hr>
            <br></br>
            <div className='profileFields'>
                <label>First Name:</label>
                <input></input>

                <label>Last Name:</label>
                <input></input>

                <label>Id:</label>
                <input></input>

                <label>Email:</label>
                <input></input>

                <label>Password:</label>
                <input></input>

                <label>Role:</label>
                <input></input>

                <button>Save</button>
            </div>
            
             
        </div>
    </div>
</div> 
    )
}

export default ProfileInformation;