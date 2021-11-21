import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changeEyedAlbum, changeViewedUser, changeOffer } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import apiService from '../../APIservice';
import MessageMini from '../search-minis/message-mini/message-mini';
import './messages.css';
import { Message } from '../../interfaces/Message';
import { Album } from '../../interfaces/Album';

const MessagesTab: React.FC = () => {
  //state
  const [messages, changeMessages] = useState<Message[]>([]);
  const [trading, changeTrading] = useState<boolean>(false);
  const [tradeStatus, changeTradeStatus] = useState<boolean>(false);
  const [tradeInfo, changeTradeInfo] = useState<Message | null>(null);
  const [albumInfo1, changeAlbumInfo1] = useState<Album | null>(null);
  const [albumInfo2, changeAlbumInfo2] = useState<Album | null>(null);
  const [message, changeMessage] = useState<string>('');
  const [location, changeLocation] = useState<string>('');

  //redux
  const user = useAppSelector<string>(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //changes 'trade' message
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const message = e.target.value;
    changeMessage(message);
  }

  //changes 'trade' location
  function handleChangeLocation(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const location = e.target.value;
    changeLocation(location);
  }

  //navigates to 'reply'
  function handleClick(m: Message): void {
    dispatch(changeViewedUser(m.fromUser));
    dispatch(changeEyedAlbum(m.album));
    dispatch(changeOffer(m.offeredAlbum));
    navigate('/reply');
  }

  //deletes a message
  async function handleDelete(m: Message): Promise<void> {
    await apiService.deleteMessage(m.id);
    const messageArray = await apiService.getMessages(user);
    messageArray.sort((a: Message) => a.id);
    changeMessages(messageArray);
  }

  //sets state to make a trade
  async function handleTrade(m: Message): Promise<void> {
    changeTrading(true);
    changeTradeInfo(m);
    const info1 = await apiService.getAlbumInfo(m.offeredAlbum);
    changeAlbumInfo1(info1);
    const info2 = await apiService.getAlbumInfo(m.album);
    changeAlbumInfo2(info2);
  }

  //sends a trade offer to the server
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const tradeObject = {
      user1: tradeInfo?.toUser,
      user2: tradeInfo?.fromUser,
      user1offer: tradeInfo?.offeredAlbum,
      user2offer: tradeInfo?.album,
      location: location,
      additional: message,
    };
    await apiService.makeTrade(tradeObject);
    changeTradeStatus(true);
  }

  //sets up state on mount
  useEffect(() => {
    async function getMessages(): Promise<void> {
      const messageArray = await apiService.getMessages(user);
      messageArray.sort((a: Message) => a.id);
      changeMessages(messageArray);
    }
    getMessages();
  }, []);

  return (
    <div className='messages-container'>
      {tradeStatus && <h1>Trade Submitted</h1>}
      {!tradeStatus &&
        trading && ( // form to make a trade, is hidden on mount
          <div>
            <h2>
              Trade between {tradeInfo?.fromUser} & {tradeInfo?.toUser}
            </h2>
            <h2>Trading: </h2>
            {albumInfo1 && <h3>{albumInfo1.title}</h3>}
            {albumInfo1 && <img src={albumInfo1.thumb} />}
            <h2>For: </h2>
            {albumInfo2 && <h3>{albumInfo2.title}</h3>}
            {albumInfo2 && <img src={albumInfo2.thumb} />}
            <form onSubmit={handleSubmit}>
              <h2>Location:</h2>
              <textarea
                // type='text'
                placeholder='Specify location...'
                name='message'
                className='message-box'
                value={location}
                onChange={handleChangeLocation}
              />
              <h3>Additional Info:</h3>
              <textarea
                // type='text'
                placeholder='Add message...'
                name='message'
                className='message-box'
                value={message}
                onChange={handleChange}
              />
              <input type='submit' value='Send Trade' className='button' />
            </form>
          </div>
        )}
      {!tradeStatus &&
        !trading && ( // normal message view
          <div>
            <div className='incoming'>
              <h1>Incoming Messages</h1>
              {messages.map(m => {
                if (m.toUser === user)
                  return (
                    <MessageMini
                      key={m.message}
                      fromUser={m.fromUser}
                      message={m.message}
                      album={m.album}
                      offeredAlbum={m.offeredAlbum}
                      handleDelete={() => handleDelete(m)}
                      handleClick={() => handleClick(m)}
                      handleTrade={() => handleTrade(m)}
                    />
                  );
              })}
            </div>
            <div className='outgoing'>
              <h1>Sent Messages</h1>
              {messages.map(m => {
                if (m.fromUser === user)
                  return (
                    <MessageMini
                      key={m.message}
                      toUser={m.toUser}
                      message={m.message}
                      album={m.album}
                      offeredAlbum={m.offeredAlbum}
                      sent={true}
                    />
                  );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

export default MessagesTab;
