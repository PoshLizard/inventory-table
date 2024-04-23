import profileLogo from '../images/user-profile.png'
import Header from '../components/Header';
import SideNav from '../components/SideNav';

function ProfileInformation(){
    return (
<div>
    <Header/>
    <div>
        <SideNav></SideNav>
        
        <div className='profileInfo'>
            <img className='profileLogo' src={profileLogo} />
            <div>
                <h1>Tunmise Kehinde</h1>
                <p>Role: Manager</p>
            </div>
        </div>
    </div>
</div>
    

    
    
        
    )
}

export default ProfileInformation;