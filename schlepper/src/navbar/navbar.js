import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const auth = useSelector(state => state.auth.auth);

  const style = {
    textDecoration: 'none',
    color: 'white',
    marginLeft: '20px'
    };

  return(
    <div className="navbar">
      <h3>Schlepper</h3>
      {auth && 
      <div className="links">
      <Link to='/' style={style}>Dashboard |</Link>
      <Link to='/messages' style={style}>Messages |</Link>
      <Link to='/trades'style={style}>Browse Trades |</Link>
      <Link to='/search'style={style}>Search |</Link>
      <Link to='/profile' style={style}>Profle</Link>
      </div>
      }
    </div>
    );
  };

export default Navbar;