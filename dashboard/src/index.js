import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>,
    document.getElementById('root')
);