import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

///////////////////////////////
// import { createStore } from 'redux';
// import reducers from './redux/reducers';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

//stuff for redux-persist to keep user logged in after page refresh
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);
// let store = createStore(persistedReducer);
