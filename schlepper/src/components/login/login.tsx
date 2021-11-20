import React, { useState } from 'react';
import './login.css';
import apiService from '../../APIservice';
import { useDispatch } from 'react-redux';
import { User } from '../../interfaces/User';
import { authTrue, changeUser, changeCollection, changeWants } from '../../redux/actions';

const initialState = {
  username: '',
  password: '',
};

const Login: React.FC = () => {
  //state, initial state is outside of Login component
  const [state, setState] = useState<User>(initialState);

  //redux
  const dispatch = useDispatch();

  //tracks inputs in login form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setState(state => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //sets user data in redux upon successful log in
  async function logAttempt(userObject: User) {
    const response = await apiService.login(userObject);
    if (response.confirmed) {
      const { accessToken, collection, wants } = response;
      localStorage.setItem('accessToken', accessToken);
      dispatch(changeUser(userObject.username));
      dispatch(changeCollection(JSON.parse(collection)));
      dispatch(changeWants(JSON.parse(wants)));
      dispatch(authTrue());
    } else alert('Invalid Username or Password');
  }

  return (
    <div className='container'>
      <div className='login'>
        <h2>Log In</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            logAttempt(state);
            setState(initialState);
          }}
        >
          <input
            type='username'
            placeholder='Username'
            name='username'
            value={state.username}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          <input type='submit' value='Log In' className='button' />
        </form>
      </div>
    </div>
  );
};

export default Login;
