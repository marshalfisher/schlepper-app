import { authFalse, authTrue, changeUser, changePass } from '../actions';
import { connect } from 'react-redux';
import apiService from '../APIservice';

function Login ({user, password, changeUser, changePass}) {

    async function logAttempt(userObject) {
      const response = await apiService.login(userObject)
      console.log(response.status)

    } 

    return (
        <div className="container">
            <div className="login">
                <h2>Log In</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    logAttempt({username: user.user, password: password.password})

                    }
                }>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={user.user}
                      onChange={(e) => {
                          changeUser(e.target.value)
                        }
                    }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        changePass(e.target.value)
                      }}
                    />
                    <input type="submit" value="Log In" className="button"/>
               </form>
            </div>
        </div>
    )
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
    authTrue: () => dispatch(authTrue()),
    authFalse: () => dispatch(authFalse()),
    changeUser: (text) => dispatch(changeUser(text)),
    changePass: (text) => dispatch(changePass(text))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);