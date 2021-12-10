import { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import apiService from '../../../APIservice';
import MiniAlbum from '../../album-mini/album-mini';
import './reply.css';

function Reply() {
  //state
  const [message, changeMessage] = useState<string>('');
  const [status, changeStatus] = useState<number>(0);

  //redux
  const fromUser = useAppSelector<string>(state => state.user);
  const toUser = useAppSelector<string>(state => state.viewedUser.viewedUser);
  const album = useAppSelector<string>(state => state.eyedAlbum.eyedAlbum);
  const offer = useAppSelector<string>(state => state.offer.offer);

  //sets message value to state
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const message = e.target.value;
    changeMessage(message);
  }

  //sends message
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
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
