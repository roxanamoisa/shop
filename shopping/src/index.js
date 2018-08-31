import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal';

var appElement = document.getElementById('root');

Modal.setAppElement(appElement);

ReactDOM.render(<App />, appElement);
registerServiceWorker();
