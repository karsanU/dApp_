import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SingUp from './views/singUp';
import ParticlesBg from 'particles-bg';

ReactDOM.render(
  <React.StrictMode>
    <SingUp />
    <ParticlesBg type='thick' bg={true} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
