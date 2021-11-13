import './user-mini.css'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { changeViewedUser } from '../../actions';

function UserMini ({u}) {
    const dispatch = useDispatch();
    
    function handleClick () {
      dispatch(changeViewedUser(u.username));
    }

    return (
        <div className="mini">
        {/* <img src={} alt="Profile Picture"/> */}
        <div className="picture-placeholder">

        </div>
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

export default UserMini