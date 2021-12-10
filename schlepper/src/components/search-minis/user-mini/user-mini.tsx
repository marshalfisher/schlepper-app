import './user-mini.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { changeViewedUser } from '../../../redux/actions';
import { User } from '../../../interfaces/User';

interface Props {
  user: User;
}

const UserMini: React.FC<Props> = ({ user }) => {
  //redux
  const dispatch = useAppDispatch();

  //store selected user in redux
  function handleClick(): void {
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
