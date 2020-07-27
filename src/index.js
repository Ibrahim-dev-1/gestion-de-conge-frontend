import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {AuthenticationProvider} from './contexts/authContext';

import App from './App';

ReactDOM.render(
<AuthenticationProvider> 
    <App /> 
</AuthenticationProvider > 
, document.getElementById("root"));