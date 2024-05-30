import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById('root')
);