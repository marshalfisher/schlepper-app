import apiService from '../../APIservice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './create-user.css';
import { User } from '../../interfaces/User';
import { authTrue, changeUser, changeCollection, changeWants } from '../../redux/actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  city: '',
  state: '',
};

function CreateUser() {
  //state, initial state defined outside component
  const [state, setState] = useState<User>(initialState);

  //reduc
  const dispatch = useDispatch();

  // tracks user inputs and stores them to state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setState(state => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //sends log in request to server
  async function logAttempt(userObject: User) {
    const response = await apiService.createUser(userObject);
    if (response.confirmed) {
      const { accessToken } = response;
      localStorage.setItem('accessToken', accessToken);
      dispatch(changeUser(userObject.username));
      dispatch(changeWants([]));
      dispatch(changeCollection([]));
      dispatch(authTrue());
    }
  }

  return (
    <div className='container'>
      <div className='create-user'>
        <h2>Create New User</h2>
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
            type='email'
            placeholder='Email'
            name='email'
            value={state.email}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          <input
            type='city'
            placeholder='City'
            name='city'
            value={state.city}
            onChange={handleChange}
          />
          {/* long list lmfao */}
          <label>Select State:</label>
          <select id='state' name='state' onChange={handleChange}>
            <option value='al'>Alabama</option>
            <option value='ak'>Alaska</option>
            <option value='az'>Arizona</option>
            <option value='ar'>Arkansas</option>
            <option value='ca'>California</option>
            <option value='co'>Colorado</option>
            <option value='ct'>Connecticut</option>
            <option value='da'>Delaware</option>
            <option value='fl'>Florida</option>
            <option value='ga'>Georgia</option>
            <option value='hi'>Hawaii</option>
            <option value='id'>Idaho</option>
            <option value='il'>Illinois</option>
            <option value='in'>Indiana</option>
            <option value='ia'>Iowa</option>
            <option value='ks'>Kansas</option>
            <option value='ky'>Kentucky</option>
            <option value='la'>Louisiana</option>
            <option value='me'>Maine</option>
            <option value='md'>Maryland</option>
            <option value='ma'>Massachusetts</option>
            <option value='mi'>Michigan</option>
            <option value='mn'>Minnesota</option>
            <option value='ms'>Mississippi</option>
            <option value='mo'>Missouri</option>
            <option value='mt'>Montana</option>
            <option value='ne'>Nebraska</option>
            <option value='nv'>Nevada</option>
            <option value='nh'>New Hampshire</option>
            <option value='nj'>New Jersey</option>
            <option value='nm'>New Mexico</option>
            <option value='ny'>New York</option>
            <option value='nc'>North Carolina</option>
            <option value='nd'>North Dakota</option>
            <option value='oh'>Ohio</option>
            <option value='ok'>Oklahoma</option>
            <option value='or'>Oregon</option>
            <option value='pa'>Pennsylvania</option>
            <option value='pr'>Puerto Rico</option>
            <option value='ri'>Rhode Island</option>
            <option value='sc'>South Carolina</option>
            <option value='sd'>South Dakota</option>
            <option value='tn'>Tennessee</option>
            <option value='tx'>Texas</option>
            <option value='ut'>Utah</option>
            <option value='vt'>Vermont</option>
            <option value='va'>Virginia</option>
            <option value='wa'>Washington</option>
            <option value='dc'>Washington D.C.</option>
            <option value='wv'>West Virginia</option>
            <option value='wi'>Wisconsin</option>
            <option value='wy'>Wyoming</option>
          </select>
          <input type='submit' value='Create Account' className='button' />
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
