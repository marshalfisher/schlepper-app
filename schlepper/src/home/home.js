import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from '../dashboard/dashboard';
import Search from '../search/search';
import Navbar from '../navbar/navbar';
import './home.css'

function Home () {
    return (
        <Router>
            < Navbar />
            <Routes>
                <Route path='/' exact element={<Dashboard/>}/>
                <Route path='/search' element={<Search/>}/>
            </Routes>
        </Router>
    )
}

export default Home;
