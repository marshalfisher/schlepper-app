import { useEffect, useState,  } from 'react';
import apiService from '../../APIservice';
import './message-mini.css';

function MessageMini ({fromUser, toUser, album, offeredAlbum, message, sent, handleClick, handleDelete}) {

  const [albumInfo, changeAlbumInfo] = useState({});
  const [offeredAlbumInfo, changeOfferedAlbumInfo] = useState({});
  
  useEffect (()=> {
    async function getInfo () {
      const info =  await apiService.getAlbumInfo(album)
      if (info) {
        changeAlbumInfo({
          title: info.title,
          artist: info.artists_sort,
          picURL: info.thumb
        });
      };

      const offeredInfo =  await apiService.getAlbumInfo(offeredAlbum)
      if (offeredInfo) {
        changeOfferedAlbumInfo({
          title: offeredInfo.title,
          artist: offeredInfo.artists_sort,
          picURL: offeredInfo.thumb
        });
      };
    };

    getInfo();
  },[]);

  return (
    <div className="mini-message">
      <img src={albumInfo.picURL} alt="Album Cover"/>
      <div>
        {toUser && <p>To: {toUser}</p>}
        {fromUser && <p>From: {fromUser}</p>}
        <p>Trading: {albumInfo.title}</p>
        <p>For: {offeredAlbumInfo.title}</p>
        {message && <p> Message: {message}</p>}
        {!sent && <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleClick}>Reply</button>
          </div>
        }
      </div>
    </div>
  )
};

export default MessageMini;