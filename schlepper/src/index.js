import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'


//stuff for redux-persist to keep user logged in after page refresh
const persistConfig = {
key: 'root',
storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

//original store incase persist library need to be swapped out or anything
// let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__());



  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
