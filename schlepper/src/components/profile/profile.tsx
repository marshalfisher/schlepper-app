import React, { useEffect, useState } from 'react';
import MiniAlbum from '../album-mini/album-mini';
import apiService from '../../APIservice';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { changeEyedAlbum } from '../../redux/actions';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { User } from '../../interfaces/User';

let initialData = {
  username: 'Username',
  city: 'City',
  state: 'State',
  email: '',
};

interface Image {
  name: string;
}

interface Props {
  username: string;
}

const Profile: React.FC<Props> = username => {
  //state
  const [userData, changeUserData] = useState<User>(initialData);
  const [image, changeImage] = useState<Image>({ name: '' });
  const [collection, changeCollection] = useState<string[]>([]);
  const [wants, changeWants] = useState<string[]>([]);
  const [displayedPhoto, changeDisplayedPhoto] = useState<string>('');

  //redux
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //sets image to state
  function handleChange(e: any): void {
    changeImage(e.target.files[0]);
  }

  //sends a message to the user
  function handleTrade(a: string): void {
    dispatch(changeEyedAlbum(a));
    navigate('/newMessage');
  }

  //set image as new profile image and save it to /public/uploads folder
  async function handleClick(e: React.MouseEvent<HTMLElement>): Promise<void> {
    e.preventDefault();
    try {
      const tag = image.name.slice(-3);
      if (tag === 'png' || tag === 'jpg' || tag === 'gif') {
        await apiService.sendImage(image);
        await apiService.updateUser(user, 'photo', image.name);
        changeDisplayedPhoto(image.name);
      } else alert('image format not supported');
    } catch (e) {
      console.log(e);
    }
  }
  console.log('PROFILE', username);
  //gets user info on mount
  useEffect(() => {
    async function getUserInfo(): Promise<void> {
      const resUserData = await apiService.getUser(username);
      changeUserData(resUserData);
      changeCollection(JSON.parse(resUserData.collection));
      changeWants(JSON.parse(resUserData.wants));
      changeDisplayedPhoto(resUserData.photo);
    }
    getUserInfo();
  }, [username]);

  return (
    <div className='profile'>
      <img src={`/uploads/${displayedPhoto}`} alt='profile' />
      {user == username.username && (
        <div>
          <input type='file' onChange={handleChange} />
          <button onClick={handleClick}>Submit</button>
        </div>
      )}
      <div className='profile-info'>
        <h2>{userData.username}</h2>
        <p>City: {userData.city}</p>
        <p>State: {userData.state?.toUpperCase()}</p>
        <div className='Collection'>
          <h3>{userData.username}'s Collection</h3>
          {collection.map(a => (
            <MiniAlbum
              key={a}
              albumID={a}
              username={username}
              handleClick={() => handleTrade(a)}
              clickValue={user === username ? undefined : 'Trade'}
            />
          ))}
        </div>
        <div className='Wants'>
          <h3>{userData.username}'s Wants</h3>
          {wants.map(a => (
            <MiniAlbum
              key={a}
              albumID={a}
              username={username}
              handleClick={function (username: string, albumID: string): void {
                throw new Error('Function not implemented.');
              }}
              clickValue={undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
