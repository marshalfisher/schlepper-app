import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from '../dashboard/dashboard';
import Search from '../search/search';
import Navbar from '../navbar/navbar';
import TradesTab from '../trades/trades';
import MessagesTab from '../messages/messages';
import NewMessage from '../messages/new-message/new-message';
import './home.css'
import Profile from '../profile/profile';
import {useSelector} from 'react-redux'

function Home () {

    const username = useSelector(state => state.user.user)
    const viewedUser = useSelector(state => state.viewedUser.viewedUser)

    return (
        <Router>
            < Navbar />
            <Routes>
                <Route path='/' exact element={<Dashboard/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/messages' element={<MessagesTab/>}/>
                <Route path='/trades' element={<TradesTab/>}/>
                <Route path='/profile' exact element={<Profile username={username}/>}/>
                <Route path='/user' element={<Profile username={viewedUser}/>}/>
                <Route path='/newMessage' element={<NewMessage/>}/>
            </Routes>
        </Router>
    )
}

export default Home;
