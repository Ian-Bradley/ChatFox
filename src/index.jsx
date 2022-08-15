import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import { SocketProvider } from './util/websocket.js';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global.js';
import theme from './styles/theme.js';
import './styles/normalize.css';

import App from './App.jsx';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <SocketProvider>
                <GlobalStyles></GlobalStyles>
                <App />
            </SocketProvider>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
