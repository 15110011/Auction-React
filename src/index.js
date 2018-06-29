/* global FB*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {  BrowserRouter } from 'react-router-dom'



window.fbAsyncInit = function() {
    FB.init({
      appId      : '1603931246371721',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });
      
    FB.AppEvents.logPageView();   
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('root'));
    registerServiceWorker();
          
  };
    