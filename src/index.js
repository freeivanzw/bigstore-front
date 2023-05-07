import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/index'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const BASE_URL = process.env.PUBLIC_URL;

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

