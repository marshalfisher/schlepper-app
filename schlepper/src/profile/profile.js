import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import MiniAlbum from '../album-mini/album-mini';
import apiService from '../APIservice';
import './profile.css';
import {useNavigate} from 'react-router-dom';
import { changeEyedAlbum } from '../actions';

let initialData = {
    username: "Username",
    city: "City",
    state: "State",
};

function Profile (username) {
     
  const user = useSelector(state => state.user.user)
  const [userData, changeUserData] = useState(initialData)
  const [image, changeImage] = useState(null)
  const [collection, changeCollection] = useState([])
  const [wants, changeWants] = useState([])
  const [displayedPhoto, changeDisplayedPhoto] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  function handleChange (e) {
    changeImage(e.target.files[0])
    console.log(e.target.files[0])
  }
  
  function handleTrade (a) {
    dispatch(changeEyedAlbum(a))
    navigate('/newMessage');
  }

  async function handleClick (e) {
    e.preventDefault()
    try {
    const tag = image.name.slice(-3)
    if (tag === 'png' || tag === 'jpg' || tag === 'gif') {
      await apiService.sendImage(image)
      await apiService.updateUser(user, 'photo', image.name)
      changeDisplayedPhoto(image.name)
    } else alert('image format not supported');
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    async function getUserInfo () {
        const resUserData = await apiService.getUser(username);
        changeUserData(resUserData)
        changeCollection(JSON.parse(resUserData.collection))
        changeWants(JSON.parse(resUserData.wants))
        changeDisplayedPhoto(resUserData.photo)
    }  
    getUserInfo ()
  }, [username])

  return (
      <div className="profile">
  
      <img src={`/uploads/${displayedPhoto}`} alt="profile"/>
      {user == username.username &&
      <div>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleClick}>Submit</button>
      </div>
      }
      <div className="profile-info">
        <h2>{userData.username}</h2>
        <p>City: {userData.city}</p>
        <p>State: {userData.state.toUpperCase()}</p>
        <div className="Collection">
            <h3>{userData.username}'s Collection</h3>
            {collection.map(a => <MiniAlbum key={a}
              albumID={a}
              username={username}
              handleClick={() => handleTrade(a)}
              clickValue={user ===username.username? undefined :"Trade"}/>)}
        </div>
        <div className="Wants">
          <h3>{userData.username}'s Wants</h3>
          {wants.map(a => <MiniAlbum key={a}
            albumID={a}
            username={username}
            />)}
         </div>
      </div>
      
    </div>
  )
}

export default Profile