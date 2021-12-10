import apiService from '../../../APIservice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { changeCollection, changeWants } from '../../../redux/actions';
import { Album } from '../../../interfaces/Album';

interface Props {
  result: Album;
}

const ReleaseMini: React.FC<Props> = ({ result }) => {
  //redux
  const username = useAppSelector<string>(state => state.user);
  const dispatch = useAppDispatch();

  //adds search result to user's collection
  async function handleCollectionClick(): Promise<void> {
    const res = await apiService.addCollection({ username, album: result.id });
    dispatch(changeCollection(res));
  }

  //adds search result to user's wants
  async function handleWantClick(): Promise<void> {
    const res = await apiService.addWant({ username, album: result.id });
    dispatch(changeWants(res));
  }

  return (
    <div className='mini'>
      <img src={result.thumb} alt='Album Cover' />
      <div className='mini-info'>
        {result.label && result.formats && (
          <>
            <h2>{result.title ? result.title : 'Album'}</h2>
            <p>{result.label[0] ? result.label[0] : 'Label'}</p>
            <p>{result.year ? result.year : 'Year'}</p>
            <p>{result.formats[0].name ? result.formats[0].name : 'Format'}</p>
            <button onClick={handleCollectionClick}>Add to Collection</button>
            <button onClick={handleWantClick}>Add to Wants</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReleaseMini;
