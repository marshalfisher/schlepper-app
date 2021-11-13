import { useEffect, useState } from 'react'
import apiService from '../APIservice';
import './profile.css';

let initialData = {
    username: "Username",
    city: "City",
    state: "State"
};

function Profile (username) {
    
    const [userData, changeUserData] = useState(initialData)
    const [photo, changePhoto] = useState(null)
    
    function handleChange (e) {
      changePhoto(e.target.files[0])
      console.log(e.target.files[0])
    }

    function handleClick () {
        const tag = photo.name.slice(-3)
        if (tag === 'png' || tag === 'jpg' || tag === 'gif') {
          apiService.sendPhoto(username, photo)
        } else alert('image format not supported');
    }

    useEffect(() => {
        async function getUserInfo () {
            const resUserData = await apiService.getUser(username);
            changeUserData(resUserData)
        }
        getUserInfo ()
    }, [username])

    return (
        <div className="profile">
        <div className="picture-placeholder">
        {photo !== null && 
        <img src={photo} alt="profile"/>}
        </div>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleClick}>Submit</button>
        <div className="profile-info">
          <h2>{userData.username}</h2>
          <p>City: {userData.city}</p>
          <p>State: {userData.state.toUpperCase()}</p>
        </div>
      </div>
    )
}

export default Profile