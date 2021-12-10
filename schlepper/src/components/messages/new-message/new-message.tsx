import { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import MiniAlbum from '../../album-mini/album-mini';
import apiService from '../../../APIservice';
import './new-message.css';

function NewMessage() {
  //state
  const [offeredAlbum, changeOfferedAlbum] = useState<string>('');
  const [message, changeMessage] = useState<string>('');
  const [status, changeStatus] = useState<number>(0);

  //redux
  const toUser = useAppSelector<string>(state => state.viewedUser);
  const fromUser = useAppSelector<string>(state => state.user);
  const album = useAppSelector<string>(state => state.eyedAlbum.eyedAlbum);
  const collection = useAppSelector<string[]>(state => state.collection.collection);

  //set message in state
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const message = e.target.value;
    changeMessage(message);
  }

  // submits message to the server
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const messageObject = { toUser, fromUser, album, offeredAlbum, message };
    const response = await apiService.sendMessage(messageObject);
    if (response) changeStatus(response.status);
  }

  return (
    <div className='message-create'>
      {status === 201 && <h1>Message Sent</h1>}
      {status !== 0 && status !== 201 && <h1>Message Failed to Send</h1>}
      {!status && (
        <div>
          <h1>New Message</h1>
          <h2>To : {toUser}</h2>
          <h2>From : {fromUser}</h2>
          <h2>Album:</h2>
          <MiniAlbum albumID={album} />
          <h2>Your Offer:</h2>
          {!offeredAlbum && 'Select Album'}
          {offeredAlbum && <MiniAlbum albumID={offeredAlbum} />}
          <div className='Collection'>
            <h3>Your Collection</h3>
            <div className='user-collection'>
              {collection.map(a => (
                <MiniAlbum
                  key={a}
                  albumID={a}
                  username={fromUser}
                  handleClick={() => changeOfferedAlbum(a)}
                  clickValue='Offer'
                />
              ))}
            </div>
          </div>
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

export default NewMessage;
