import {useSelector, useDispatch} from 'react-redux';
import { changeCollection, changeWants } from '../actions';
import MiniAlbum from '../album-mini/album-mini';
import apiService from '../APIservice';
import './dashboard.css';

function Dashboard () {

  //redux  
  const username = useSelector(state => state.user.user);
  let collection = useSelector(state => state.collection.collection);
  let wants = useSelector(state => state.wants.wants);
  const dispatch = useDispatch();
  
  //deletes single item from user collection
  async function deleteCollection(username, album) {
    const newCollection = await apiService.removeCollection({username, album});
    dispatch(changeCollection(newCollection));
  }
    
  //deletes single item from user wants
  async function deleteWant(username, album) {
    const newWants = await apiService.removeWant({username, album});
    dispatch(changeWants(newWants));
  }

  return (
    <div className="dashboard">
      <h2>Hello {username}</h2>
      <div className="Collection">
        <h3>Your Collection</h3>
        {collection.map(a => <MiniAlbum key={a}
          albumID={a}
          username={username}
          handleClick={deleteCollection}
          clickValue="Remove"/>
        )}
      </div>
      <div className="Wants">
      <h3>Your Wants</h3>
      {wants.map(a => <MiniAlbum key={a}
        albumID={a}
        username={username}
        handleClick={deleteWant}
        clickValue="Remove"/>
      )}
      </div>
    </div>
  );
};


export default Dashboard;