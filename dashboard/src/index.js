import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <CookiesProvider>
        <ContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
    </CookiesProvider>,
    document.getElementById('root')
);