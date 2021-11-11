import './App.css';
import { connect, useSelector} from 'react-redux';
import Dashboard from './dashboard/dashboard'
import Login from './login/login'
import Navbar from './navbar/navbar';
import CreateUser from './create-user/create-user';
import {useState, useEffect} from 'react'



function App() {
 
  const authorized = useSelector(state => state.auth);
  // const token = useSelector(state => state.token);


  const [logStatus, changeLogStatus] = useState(true)
  
  useEffect(()=>{
    console.log("placeholderrrrr")
  },[])

  function handleClick () {
    if (logStatus === true) {
      changeLogStatus(false)
    } else {
      changeLogStatus(true)
    }
    console.log(logStatus)
  } 

  return (
    <div className="app">
    < Navbar />
    {authorized? <Dashboard/> : 
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
  );
}

export default connect(

)(App);