import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changeEyedAlbum, changeViewedUser, changeOffer } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import apiService from '../../APIservice';
import MessageMini from '../search-minis/message-mini/message-mini';
import './messages.css';
import { Message } from '../../interfaces/Message';
import { Album } from '../../interfaces/Album';
import { gapi } from 'gapi-script';
import moment from 'moment';
import Map from '../map/map';

const MessagesTab: React.FC = () => {
  const [position, setPosition] = useState<any>({
    latitude: '',
    longitude: '',
  });
  navigator.geolocation.getCurrentPosition(storeCurrentPosition);
  function storeCurrentPosition(position: any) {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  //state
  const [messages, changeMessages] = useState<Message[]>([]);
  const [trading, changeTrading] = useState<boolean>(false);
  const [tradeStatus, changeTradeStatus] = useState<boolean>(false);
  const [tradeInfo, changeTradeInfo] = useState<Message | null>(null);
  const [albumInfo1, changeAlbumInfo1] = useState<Album | null>(null);
  const [albumInfo2, changeAlbumInfo2] = useState<Album | null>(null);
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [calendarLink, setCalendarLink] = useState<string>('');

  //redux
  const user = useAppSelector<string>(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (value: string, setter: (value: string) => void) => {
    setter(value);
  };

  //navigates to 'reply'
  function handleClick(message: Message): void {
    dispatch(changeViewedUser(message.fromUser));
    dispatch(changeEyedAlbum(message.album));
    dispatch(changeOffer(message.offeredAlbum));
    navigate('/reply');
  }

  //deletes a message
  async function handleDelete(message: Message): Promise<void> {
    await apiService.deleteMessage(message.id);
    const messageArray = await apiService.getMessages(user);
    messageArray.sort((message: Message) => message.id);
    changeMessages(messageArray);
  }

  //sets state to make a trade
  async function handleTrade(message: Message): Promise<void> {
    changeTrading(true);
    changeTradeInfo(message);
    const info1 = await apiService.getAlbumInfo(message.offeredAlbum);
    changeAlbumInfo1(info1);
    const info2 = await apiService.getAlbumInfo(message.album);
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
      additional: date,
    };
    await apiService.makeTrade(tradeObject);
    const resUserData = await apiService.getUser({ username: tradeInfo?.fromUser });
    addEventToCalendar(resUserData.email);
    changeTradeStatus(true);
  }

  // Ad event to Google Calendat
  const addEventToCalendar = (email: string) => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyCjDWzfOwgx9rbZDHj0cQ4Cnc3JoEpMKeQ',
        clientId:
          '965467492625-84q4gf85n21mso8kd0uvadfulvd98q0k.apps.googleusercontent.com',
        discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });
      gapi.client.load('calendar', 'v3');
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Trade Event!',
            location: location,
            description: 'This is a trading event created on Schlepper',
            start: {
              dateTime: moment(date).toISOString(true),
            },
            end: {
              dateTime: moment(date).add(1, 'hour').toISOString(true),
            },
            attendees: [{ email: email }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };
          let request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          request.execute((event: any) => {
            setCalendarLink(event.htmlLink);
          });
        });
    });
  };

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
      {tradeStatus && (
        <>
          <h1>Trade Submitted</h1>
          <button onClick={() => window.open(calendarLink)}>
            Check out your event on Google Calendar
          </button>
        </>
      )}
      {!tradeStatus && trading && tradeInfo && (
        <div>
          <h2>
            Trade between {tradeInfo.fromUser} & {tradeInfo.toUser}
          </h2>
          <h2>Trading: </h2>
          {albumInfo1 && (
            <>
              <h3>{albumInfo1.title}</h3>
              <img src={albumInfo1.thumb} />
            </>
          )}
          <h2>For: </h2>
          {albumInfo2 && (
            <>
              <h3>{albumInfo2.title}</h3>
              <img src={albumInfo2.thumb} />
            </>
          )}
          <form onSubmit={handleSubmit}>
            <h2>Location:</h2>
            <input
              type='text'
              placeholder='Specify location...'
              name='message'
              className='info-input--location'
              value={location}
              onChange={e => handleChange(e.target.value, setLocation)}
            />
            <h3>Date and time:</h3>
            <input
              type='datetime-local'
              placeholder='Add date...'
              name='date'
              className='info-input--date'
              value={date}
              onChange={e => handleChange(e.target.value, setDate)}
            />
            <Map position={position} />

            <input type='submit' value='Send Trade' className='button' />
          </form>
        </div>
      )}
      {!tradeStatus && !trading && (
        <div>
          <div className='incoming'>
            <h1>Incoming Messages</h1>
            {messages.map(message => {
              if (message.toUser === user)
                return (
                  <MessageMini
                    key={message.id}
                    fromUser={message.fromUser}
                    message={message.message}
                    album={message.album}
                    offeredAlbum={message.offeredAlbum}
                    handleDelete={() => handleDelete(message)}
                    handleClick={() => handleClick(message)}
                    handleTrade={() => handleTrade(message)}
                  />
                );
            })}
          </div>
          <div className='outgoing'>
            <h1>Sent Messages</h1>
            {messages.map(message => {
              if (message.fromUser === user)
                return (
                  <MessageMini
                    key={message.id}
                    toUser={message.toUser}
                    message={message.message}
                    album={message.album}
                    offeredAlbum={message.offeredAlbum}
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
