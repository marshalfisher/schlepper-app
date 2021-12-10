import './App.css';
// import { connect } from 'react-redux';
import Login from '../login/login';
import Navbar from '../navbar/navbar';
import CreateUser from '../create-user/create-user';
import Home from '../home/home';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';

const App: React.FC = () => {
  //state
  const [logStatus, changeLogStatus] = useState<boolean>(true);

  //redux
  const authorized = useAppSelector(state => state.auth);
  // const token = useSelector(state => state.token);

  //handles state and redux upon logging in
  function handleClick(): void {
    if (logStatus === true) {
      changeLogStatus(false);
    } else {
      changeLogStatus(true);
    }
  }

  //changes titles of window/tab
  useEffect(() => {
    document.title = 'Schlepper';
  }, []);

  return (
    <div className='skin'>
      <div className='app'>
        {
          !authorized && <Navbar /> // empty navbar for when user isn't logged in
        }
        {authorized ? (
          <Home />
        ) : (
          <div className='intro'>
            {logStatus ? (
              <div className='log-box'>
                <Login />
                <button onClick={handleClick}>Create Account</button>
              </div>
            ) : (
              <div className='create-box'>
                <CreateUser />
                <button onClick={handleClick}>Log In</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='face'>
        <img src={'/cassette.png'} alt='idk' />
      </div>
    </div>
  );
};

export default App;
