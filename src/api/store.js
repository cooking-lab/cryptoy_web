// import { configureStore } from "@reduxjs/toolkit";
// import toysReducer from "features/Toy/ToysSlice";
// import marketsReducer from "features/TradingSystem/MarketsSlice";

// export default configureStore({
//   reducer: {
//     toys : toysReducer,
//     markets : marketsReducer
//   }
// });

import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import toysReducer from '../features/Toy/ToysSlice';
import toyReducer from 'features/Toy/ToySlice';
import userReducer from 'features/Login/UserSlice';

import marketsReducer from '../features/TradingSystem/MarketsSlice';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import ReduxThunk from "redux-thunk";

const middlewares = [logger, ReduxThunk];

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['user']
  }

const reducers = combineReducers({
    user : userReducer,
    toys : toysReducer,
    toy : toyReducer,
    markets : marketsReducer
})

const rootReducer = persistReducer(persistConfig, reducers);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
