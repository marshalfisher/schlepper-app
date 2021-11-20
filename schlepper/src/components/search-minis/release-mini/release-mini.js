import apiService from '../../../APIservice';
import { useSelector, useDispatch } from 'react-redux';
import { changeCollection, changeWants } from '../../../redux/actions';

function ReleaseMini({ result }) {
  //redux
  const username = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  //adds search result to user's collection
  async function handleCollectionClick() {
    const res = await apiService.addCollection({ username, album: result.id });
    dispatch(changeCollection(res));
  }

  //adds search result to user's wants
  async function handleWantClick() {
    const res = await apiService.addWant({ username, album: result.id });
    dispatch(changeWants(res));
  }

  return (
    <div className='mini'>
      <img src={result.thumb} alt='Album Cover' />
      <div className='mini-info'>
        <h2>{result.title ? result.title : 'Album'}</h2>
        <p>{result.label[0] ? result.label[0] : 'Label'}</p>
        <p>{result.year ? result.year : 'Year'}</p>
        <p>{result.formats[0].name ? result.formats[0].name : 'Format'}</p>
        <button onClick={handleCollectionClick}>Add to Collection</button>
        <button onClick={handleWantClick}>Add to Wants</button>
      </div>
    </div>
  );
}

export default ReleaseMini;
