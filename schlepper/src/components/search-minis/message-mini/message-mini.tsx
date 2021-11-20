import { useEffect, useState } from 'react';
import apiService from '../../../APIservice';
import './message-mini.css';

interface Props {
  fromUser: string;
  toUser: string;
  album: string;
  offeredAlbum: string;
  message: string;
  sent: boolean;
  handleClick: () => void;
  handleDelete: () => void;
  handleTrade: () => void;
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
  const [albumInfo, changeAlbumInfo] = useState(initialState);
  const [offeredAlbumInfo, changeOfferedAlbumInfo] = useState(initialState);

  useEffect(() => {
    //gets album info for message on mount
    async function getInfo() {
      const info = await apiService.getAlbumInfo(album);
      if (info) {
        changeAlbumInfo({
          title: info.title,
          artist: info.artists_sort,
          picURL: info.thumb,
        });
      }

      const offeredInfo = await apiService.getAlbumInfo(offeredAlbum);
      if (offeredInfo) {
        changeOfferedAlbumInfo({
          title: offeredInfo.title,
          artist: offeredInfo.artists_sort,
          picURL: offeredInfo.thumb,
        });
      }
    }

    getInfo();
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
