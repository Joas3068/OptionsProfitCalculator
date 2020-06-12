import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ParentComp from "./pages/ParentComp"
import * as serviceWorker from './serviceWorker';
import { Helmet } from 'react-helmet'

ReactDOM.render(
  <React.StrictMode>
          <Helmet>
          <title>Options P/L</title>
        </Helmet>
    <ParentComp ></ParentComp>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
