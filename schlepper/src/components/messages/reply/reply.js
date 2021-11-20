import { useState } from 'react';
import { useSelector } from 'react-redux';
import apiService from '../../../APIservice';
import MiniAlbum from '../../album-mini/album-mini';
import './reply.css';

function Reply() {
  //state
  const [message, changeMessage] = useState('');
  const [status, changeStatus] = useState(0);

  //redux
  const toUser = useSelector(state => state.viewedUser.viewedUser);
  const fromUser = useSelector(state => state.user.user);
  const album = useSelector(state => state.eyedAlbum.eyedAlbum);
  const offer = useSelector(state => state.offer.offer);

  //sets message value to state
  function handleChange(e) {
    const message = e.target.value;
    changeMessage(message);
  }

  //sends message
  async function handleSubmit(e) {
    e.preventDefault();
    const messageObject = { toUser, fromUser, album, offeredAlbum: offer, message };
    const response = await apiService.sendMessage(messageObject);
    if (response) changeStatus(response.status);
  }

  return (
    <div className='reply'>
      {status === 201 && <h1>Reply Sent</h1>}
      {status !== 0 && status !== 201 && <h1>Reply Failed to Send</h1>}
      {!status && (
        <div>
          <h1>Reply</h1>
          <h2>To: {toUser}</h2>
          <h2>Trading: </h2>
          <MiniAlbum albumID={album} />
          <h2>Offering: </h2>
          <MiniAlbum albumID={offer} />
          <div className='message-input'>
            <form onSubmit={handleSubmit}>
              <textarea
                type='text'
                placeholder='Add message...'
                name='message'
                className='message-box'
                value={message}
                onChange={handleChange}
              />
              <input type='submit' value='Message' className='button' />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reply;
