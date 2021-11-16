import './user-mini.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { changeViewedUser } from '../../actions';

function UserMini ({u}) {

  //redux
  const dispatch = useDispatch();
  
  //store selected user in redux
  function handleClick () {
    dispatch(changeViewedUser(u.username));
  };

  return (
    <div className="mini">
      <img src={`uploads/${u.photo}`} alt="Profile Picture"/> 
      <div className="mini-info">
        <h2>{u.username ? u.username : "Username"}</h2>
        <p>{u.city ? u.city : "City"}</p>
        <Link to="/user">
          <button onClick={handleClick}>View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default UserMini;