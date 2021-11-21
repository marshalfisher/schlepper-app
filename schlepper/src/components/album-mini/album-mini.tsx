import { useEffect, useState } from 'react';
import apiService from '../../APIservice';
import './album-mini.css';

interface Props {
  username?: any;
  albumID: string;
  handleClick?: (username: string, albumID: string) => void;
  clickValue?: string | undefined;
}

const MiniAlbum: React.FC<Props> = ({ username, albumID, handleClick, clickValue }) => {
  //state
  const [artists, setArtists] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [picURL, setPicURL] = useState<string>('');

  //gets info on mount
  useEffect(() => {
    async function getInfo(): Promise<void> {
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
        {clickValue && handleClick && (
          <button onClick={() => handleClick(username, albumID)}>{clickValue}</button>
        )}
      </div>
    </div>
  );
};

export default MiniAlbum;
