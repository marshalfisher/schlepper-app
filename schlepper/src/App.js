import './App.css';
import { connect, useSelector} from 'react-redux';
import Login from './login/login'
import Navbar from './navbar/navbar';
import CreateUser from './create-user/create-user';
import {useState} from 'react'
import Home from './home/home';


function App() {
 
  const authorized = useSelector(state => state.auth);
  // const token = useSelector(state => state.token);


  const [logStatus, changeLogStatus] = useState(true)


  function handleClick () {
    if (logStatus === true) {
      changeLogStatus(false)
    } else {
      changeLogStatus(true)
    }
  } 

  return (
    <div className ="skin">
      <div className="app">
      {!authorized && < Navbar />}
      {authorized? <Home/> : 
        <div className="intro"> 
          { logStatus? <div className="log-box">
            <Login/>
          <button onClick={handleClick}>Create Account</button>
          </div> : 
          <div className="create-box">  
            <CreateUser />
            <button onClick={handleClick}>Log In</button>
          </div>}
        </div>  
      }
      </div>
      <div className="face">
        <div className="eye">
          <div className="iris"></div>
        </div>
        <div className="nose">
        </div>
        <div className="mouth">
          <div className="teeth">
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
          </div>
          <div className="teeth">
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
            <div className="tooth"></div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default connect(

)(App);