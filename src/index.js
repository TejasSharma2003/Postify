import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from "react";

import './styles/main.scss';

//Provider for store
import { Provider } from 'react-redux';

//Store
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
