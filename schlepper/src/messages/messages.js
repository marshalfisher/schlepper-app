import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeEyedAlbum, changeViewedUser, changeOffer} from '../actions';
import {useNavigate} from 'react-router-dom';
import apiService from '../APIservice';
import MessageMini from '../search-minis/message-mini/message-mini';
import './messages.css';

function MessagesTab () {
    const [messages, changeMessages] = useState([]);
    const [response, changeResponse] = useState({})
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    function handleClick (m) {
        dispatch(changeViewedUser(m.fromUser));
        dispatch(changeEyedAlbum(m.album));
        dispatch(changeOffer(m.offeredAlbum));
        navigate('/reply');
      };

    async function handleDelete (m) {
      await apiService.deleteMessage(m.id);
      const messageArray =  await apiService.getMessages(user);
        messageArray.sort(a => a.id);
        changeMessages(messageArray);
    };

    useEffect(() => {
      async function getMessages () {
          const messageArray =  await apiService.getMessages(user);
          messageArray.sort(a => a.id);
          changeMessages(messageArray);
      }
      getMessages();
    },[response]);


    return (
        <div className="messages-container">
            <div className="incoming">
              <h1>Incoming Messages</h1>
              {messages.map(m => {
                  if (m.toUser === user) return <MessageMini 
                  key={m.message} 
                  fromUser={m.fromUser}
                  message={m.message}
                  album={m.album}
                  offeredAlbum={m.offeredAlbum}
                  handleDelete={() => handleDelete(m)}
                  handleClick={() => handleClick(m)}
                  />
                }
              )}
            </div>
            <div className="outgoing">
              <h1>Sent Messages</h1>
              {messages.map(m => {
                  if (m.fromUser === user) return <MessageMini
                  key={m.message} 
                  toUser={m.toUser}
                  message={m.message}
                  album={m.album}
                  offeredAlbum={m.offeredAlbum}
                  sent={true}
                  />
                }
              )}
            </div>
            
        </div>
    );
    
};

export default MessagesTab;