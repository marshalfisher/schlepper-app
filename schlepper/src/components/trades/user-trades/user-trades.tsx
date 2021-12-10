import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import apiService from '../../../APIservice';
import TradeMini from '../trade-mini/trade-mini';
import { Trade } from '../../../interfaces/Trade';
import './user-trades.css';

const UserTrades: React.FC = () => {
  //state
  const [trades, changeTrades] = useState<Trade[]>([]);
  //redux
  const user = useAppSelector<string>(state => state.user);

  //deletes a trade
  async function handleClick(id: string): Promise<void> {
    await apiService.deleteTrade(id);
    const incomingTrades = await apiService.getTrades(user);
    if (incomingTrades) changeTrades(incomingTrades);
  }

  //gets trades from server on mount
  useEffect(() => {
    async function getTrades(): Promise<void> {
      const incomingTrades = await apiService.getTrades(user);
      changeTrades(incomingTrades);
    }
    getTrades();
  }, []);

  return (
    <div className='user-trades-container'>
      <h1>Active Trades:</h1>
      {trades.length &&
        trades.map(trade => (
          <TradeMini
            key={trade.id}
            tradeInfo={trade}
            handleClick={() => handleClick(trade.id)}
          />
        ))}
    </div>
  );
};

export default UserTrades;
