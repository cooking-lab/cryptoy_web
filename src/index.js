import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "css/App.css";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from 'api/store';
import store from "api/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <PersistGate persistor={persistor}>
        <App />
      </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
