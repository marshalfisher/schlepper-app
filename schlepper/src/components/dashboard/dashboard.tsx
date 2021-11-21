import MiniAlbum from '../album-mini/album-mini';
import apiService from '../../APIservice';
import './dashboard.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changeCollection, changeWants } from '../../redux/actions';

const Dashboard: React.FC = () => {
  //redux
  const username = useAppSelector<string>(state => state.user);
  let collection = useAppSelector<string[]>(state => state.collection.collection);
  let wants = useAppSelector<string[]>(state => state.wants.wants);
  const dispatch = useAppDispatch();

  //deletes single item from user collection
  async function deleteCollection(username: string, album: string): Promise<void> {
    const newCollection = await apiService.removeCollection({ username, album });
    dispatch(changeCollection(newCollection));
  }

  //deletes single item from user wants
  async function deleteWant(username: string, album: string): Promise<void> {
    const newWants = await apiService.removeWant({ username, album });
    dispatch(changeWants(newWants));
  }

  return (
    <div className='dashboard'>
      <h2>Hello {username}</h2>
      <div className='Collection'>
        <h3>Your Collection</h3>
        {collection.map((a: string) => (
          <MiniAlbum
            key={a}
            albumID={a}
            username={username}
            handleClick={deleteCollection}
            clickValue='Remove'
          />
        ))}
      </div>
      <div className='Wants'>
        <h3>Your Wants</h3>
        {wants.map((a: string) => (
          <MiniAlbum
            key={a}
            albumID={a}
            username={username}
            handleClick={deleteWant}
            clickValue='Remove'
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
