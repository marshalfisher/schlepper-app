import './App.css';
import { connect } from 'react-redux';
import Dashboard from './dashboard/dashboard'
import Login from './login/login'

function App({auth, user}) {
  const authorized = auth;
  return (
    <div>
    <h1>{authorized + ' ' + String(user)}</h1>
    {authorized? <Dashboard/> : <Login/> }
    </div>
  );
}

//map state
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    password: state.password
  };
};

// map dispatch
const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);