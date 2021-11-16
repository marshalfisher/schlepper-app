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

const persistConfig = {
key: 'root',
storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//original store incase persist library need to be swapped out or anything idk
// let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__());

let store = createStore(persistedReducer);
let persistor = persistStore(store);


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
