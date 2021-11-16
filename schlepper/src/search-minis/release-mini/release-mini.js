import apiService from "../../APIservice";
import {useSelector, useDispatch, } from 'react-redux';
import {changeCollection, changeWants} from '../../actions';

function ReleaseMini ({r}) {

  //redux
  const username = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  //adds search result to user's collection
  async function handleCollectionClick () {
    const res = await apiService.addCollection({ username, album: r.id });
    dispatch(changeCollection(res));
  }

  //adds search result to user's wants
  async function handleWantClick () {
    const res = await apiService.addWant({ username, album: r.id });
    dispatch(changeWants(res));
  }

  return (
    <div className="mini">
      <img src={r.thumb} alt="Album Cover"/>
      <div className="mini-info">
        <h2>{r.title ? r.title : "Album"}</h2>
        <p>{r.label[0] ? r.label[0] : "Label"}</p>
        <p>{r.year ? r.year : "Year"}</p>
        <p>{r.formats[0].name ? r.formats[0].name : "Format"}</p>
        <button onClick={handleCollectionClick}>Add to Collection</button>
        <button onClick={handleWantClick}>Add to Wants</button>
      </div>
    </div>
  );
};

export default ReleaseMini;