import './user-mini.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeViewedUser } from '../../../redux/actions';
import { User } from '../../../interfaces/User';

interface Props {
  user: User;
}

const UserMini: React.FC<Props> = ({ user }) => {
  //redux
  const dispatch = useDispatch();

  //store selected user in redux
  function handleClick() {
    dispatch(changeViewedUser(user.username));
  }

  return (
    <div className='mini'>
      <img src={`uploads/${user.photo}`} alt='Profile Picture' />
      <div className='mini-info'>
        <h2>{user.username ? user.username : 'Username'}</h2>
        <p>{user.city ? user.city : 'City'}</p>
        <Link to='/user'>
          <button onClick={handleClick}>View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default UserMini;
