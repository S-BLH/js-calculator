import React from 'react';
import ReactDOM from 'react-dom/client';  // Changed from 'react-dom' to 'react-dom/client'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';
import './index.css';

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));  // Updated to use createRoot

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Add this line to prevent linting errors
