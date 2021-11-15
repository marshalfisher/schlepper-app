import { useSelector } from 'react-redux';
import { useState } from 'react';
import MiniAlbum from '../../album-mini/album-mini';
import './new-message.css';
import apiService from '../../APIservice';

function NewMessage () {
    const toUser = useSelector(state => state.viewedUser.viewedUser);
    const fromUser = useSelector(state => state.user.user);
    const album = useSelector(state => state.eyedAlbum.eyedAlbum);
    const collection = useSelector(state => state.collection.collection);
    const [offeredAlbum, changeOfferedAlbum] = useState('');
    const [message, changeMessage] = useState('');
    const [status, changeStatus] = useState(0);

    function handleChange(e) {
        const message = e.target.value;
        changeMessage(message);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const messageObject = {toUser, fromUser, album, offeredAlbum, message};
        const response = await apiService.sendMessage(messageObject);
        if (response) changeStatus(response.status);
    }
    
    return (
        <div className="message-create">
            {status === 201 &&  <h1>Message Sent</h1>}
            {status !== 0 && status !== 201 && <h1>Message Failed to Send</h1>}
            {!status && 
            <div>
            <h1>New Message</h1>
            <h2>To : {toUser}</h2>
            <h2>From : {fromUser}</h2>
            <h2>Album:</h2>
            <MiniAlbum albumID={album}/>
            <h2>Your Offer:</h2>
            {!offeredAlbum && "Select Album"}
            {offeredAlbum && <MiniAlbum albumID={offeredAlbum}/>}
            <div className="Collection">
            <h3>Your Collection</h3>
            <div className="user-collection">
            {collection.map(a => <MiniAlbum key={a} albumID={a} username={fromUser} handleClick={() => changeOfferedAlbum(a)} clickValue="Offer"/>)}
            </div>
          </div>
            <div className="message-input">   
                <form onSubmit={handleSubmit}>
                    <textarea
                      type="text"
                      placeholder="Add message..."
                      name="message"
                      className="message-box"
                      value={message}
                      onChange={handleChange}
                      />
                    <input type="submit" value="Message" className="button"/>
                </form>
             </div>
             </div>
             }
        </div>
    )
};

export default NewMessage;
