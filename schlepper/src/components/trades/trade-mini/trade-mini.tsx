import { useEffect, useState } from 'react';
import apiService from '../../../APIservice';
import './trade-mini.css';
import { Trade } from '../../../interfaces/Trade';
import { Album } from '../../../interfaces/Album';

interface Props {
  tradeInfo: Trade;
  handleClick: () => void;
}

const TradeMini: React.FC<Props> = ({ tradeInfo, handleClick }) => {
  //state
  const [album1, changeAlbum1] = useState<Album>({});
  const [album2, changeAlbum2] = useState<Album>({});

  //gets album information on mount
  useEffect(() => {
    async function getInfo(): Promise<void> {
      const info1 = await apiService.getAlbumInfo(tradeInfo.user1offer);
      const info2 = await apiService.getAlbumInfo(tradeInfo.user2offer);
      changeAlbum1(info1);
      changeAlbum2(info2);
    }
    getInfo();
  }, []);

  return (
    <div>
      <div className='mini'>
        <img src={album1.thumb} />
        <div className='trade-info'>
          <div className='user1'>
            <h2>{tradeInfo.user1}</h2>
            <p>{album1.title}</p>
          </div>
          <div className='user2'>
            <h2>{tradeInfo.user2}</h2>
            <p>{album2.title}</p>
          </div>
        </div>
        <img src={album2.thumb} />
      </div>
      <div className='lower-info'>
        <p>Location: {tradeInfo.location}</p>
        {tradeInfo.additional && <p>Additional: {tradeInfo.additional}</p>}
        <button onClick={handleClick}>Trade Completed</button>
      </div>
    </div>
  );
};

export default TradeMini;
