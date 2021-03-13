import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom'
import App from './App';

ReactDOM.render(
    <Router basename="/newplaylist">
      <App />
    </Router>,
  document.getElementById('root')
);

