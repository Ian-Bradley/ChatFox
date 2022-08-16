import React from 'react';
import App from './App.jsx';
import './styles/normalize.css';
import ReactDOM from 'react-dom';
import store from './redux/store';
import theme from './styles/theme.js';
import { Provider } from 'react-redux';
import GlobalStyles from './styles/global.js';
import { ThemeProvider } from 'styled-components';
import { SocketProvider } from './util/websocket.js';

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
