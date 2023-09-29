import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import reduxThunk from 'redux-thunk';
import { configureStore, combineReducers, compose } from '@reduxjs/toolkit';
import roomReducer from './components/messages/roomSlice';
import messageReducer from './components/messages/messageSlice';

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const loggerMiddleware = store => next => action => {
//   const result = next(action)
//   console.log("Middleware", store.getState())
//   return result
// }

const rootReducer = combineReducers({
  room: roomReducer,
  message: messageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [reduxThunk],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
