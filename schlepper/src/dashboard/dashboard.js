import {useSelector} from 'react-redux'
import MiniAlbum from '../album-mini/album-mini'
import './dashboard.css'

function Dashboard () {
    const user = useSelector(state => state.user.user)
    const collection = useSelector(state => state.collection.collection)
    const wants = useSelector(state => state.wants.wants)
    console.log(wants)

    return (
        <div className="dashboard">
          <h2>Hello {user}</h2>
          <div className="Collection">
            <h3>Your Collection</h3>
            {collection.map(a => <MiniAlbum key={a} albumID={a}/>)}
          </div>
          <div className="Wants">
          <h3>Your Wants</h3>
          {wants.map(a => <MiniAlbum key={a} albumID={a}/>)}
          </div>
        </div>
    )
}


export default Dashboard