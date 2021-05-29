import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import './style.css';

export const apiBaseUrl = 'https://leviexpress-backend.herokuapp.com/api';

render(<App />, document.querySelector('#app'));
