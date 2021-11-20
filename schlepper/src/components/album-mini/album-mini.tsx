import { useEffect, useState } from 'react';
import apiService from '../../APIservice';
import './album-mini.css';

interface Props {
  username: string;
  albumID: string;
  handleClick: (username: string, albumID: string) => void;
  clickValue: boolean;
}

const MiniAlbum: React.FC<Props> = ({ username, albumID, handleClick, clickValue }) => {
  //state
  const [artists, setArtists] = useState([]);
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [year, setYear] = useState(0);
  const [picURL, setPicURL] = useState('');

  //gets info on mount
  useEffect(() => {
    async function getInfo() {
      const info = await apiService.getAlbumInfo(albumID);
      if (info) {
        let label;
        if (info.labels) {
          label = info.labels[0].name;
        } else label = 'Label';
        setArtists(info.artists_sort);
        setTitle(info.title);
        setYear(info.year);
        setLabel(label);
        setPicURL(info.thumb);
      }
    }
    getInfo();
  }, [albumID]);

  return (
    <div className='mini'>
      <img src={picURL} alt='Album Cover' />
      <div className='mini-info'>
        <h2>{title ? title : 'Album'}</h2>
        <p>{artists ? artists : 'Artist'}</p>
        <p>{label ? label : 'Label'}</p>
        <p>{year ? year : 'Year'}</p>
        {clickValue && (
          <button onClick={() => handleClick(username, albumID)}>{clickValue}</button>
        )}
      </div>
    </div>
  );
};

export default MiniAlbum;
