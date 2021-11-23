import { useEffect, useState } from 'react';
import apiService from '../../../APIservice';
import './message-mini.css';
import { Album } from '../../../interfaces/Album';

interface Props {
  fromUser?: string;
  toUser?: string;
  album: string;
  offeredAlbum: string;
  message: string;
  sent?: boolean;
  handleClick?: () => void;
  handleDelete?: () => void;
  handleTrade?: () => void;
}

const MessageMini: React.FC<Props> = ({
  fromUser,
  toUser,
  album,
  offeredAlbum,
  message,
  sent,
  handleClick,
  handleDelete,
  handleTrade,
}) => {
  //state
  const initialState = { title: '', artist: '', picURL: '' };
  const [albumInfo, setAlbumInfo] = useState<Album>(initialState);
  const [offeredAlbumInfo, setOfferedAlbumInfo] = useState<Album>(initialState);

  useEffect(() => {
    async function getAlbumInfo(): Promise<void> {
      const info = await apiService.getAlbumInfo(album);
      if (info) {
        setAlbumInfo({
          title: info.title,
          artist: info.artists_sort,
          picURL: info.thumb,
        });
      }
      const offeredAlbumInfo = await apiService.getAlbumInfo(offeredAlbum);
      if (offeredAlbumInfo) {
        setOfferedAlbumInfo({
          title: offeredAlbumInfo.title,
          artist: offeredAlbumInfo.artists_sort,
          picURL: offeredAlbumInfo.thumb,
        });
      }
    }

    getAlbumInfo();
  }, []);

  return (
    <div className='mini-message'>
      <img src={albumInfo.picURL} alt='Album Cover' />
      <div>
        {toUser && <p>To: {toUser}</p>}
        {fromUser && <p>From: {fromUser}</p>}
        <p>Trading: {albumInfo.title}</p>
        <p>For: {offeredAlbumInfo.title}</p>
        {message && <p> Message: {message}</p>}
        {!sent && (
          <div>
            <button onClick={handleTrade}>Trade</button>
            <button onClick={handleClick}>Reply</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageMini;
