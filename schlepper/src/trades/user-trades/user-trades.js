import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiService from '../../APIservice';
import TradeMini from '../trade-mini/trade-mini';

import './user-trades.css';

const UserTrades = () => {
  
  //state
  const [trades, changeTrades] = useState([]);
  //redux
  const user = useSelector(state => state.user.user);
  
  //deletes a trade
  async function handleClick (id) {
    await apiService.deleteTrade(id);
    const incomingTrades = await apiService.getTrades(user);
    if (incomingTrades) changeTrades(incomingTrades);
  }

  //gets trades from server on mount
  useEffect(()=>{
    async function getTrades () {
      const incomingTrades = await apiService.getTrades(user);
      changeTrades(incomingTrades);
    }
    getTrades();
  }, [])

  return(
    <div className="user-trades-container">
      <h1>Active Trades:</h1>
      {
      trades.length && 
      trades.map(t => <TradeMini key={t.id} tradeInfo={t} handleClick={() => handleClick(t.id)}/>)
      }
    </div>
    );
  };

export default UserTrades;