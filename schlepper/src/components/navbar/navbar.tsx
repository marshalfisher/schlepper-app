import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logOut } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar: React.FC = () => {
  //redux
  const auth = useAppSelector<boolean>(state => state.auth.auth);
  const dispatch = useAppDispatch();

  //logs user out
  function handleClick(): void {
    dispatch(logOut());
  }

  //styling for redux-router links
  //note that it ISN'T css
  const style = {
    textDecoration: 'none',
    color: 'white',
    marginLeft: '20px',
  };

  return (
    <div className='navbar'>
      <h3>Schlepper</h3>
      {auth && (
        <div className='links'>
          <Link to='/' style={style}>
            Dashboard |
          </Link>
          <Link to='/messages' style={style}>
            Messages |
          </Link>
          <Link to='/userTrades' style={style}>
            Active Trades |
          </Link>
          <Link to='/trades' style={style}>
            Browse Trades |
          </Link>
          <Link to='/search' style={style}>
            Search |
          </Link>
          <Link to='/profile' style={style}>
            Profle |
          </Link>
          <Link to='/' style={style} onClick={handleClick}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
