import 'Styles/fonts.css';
import React from 'react';
import App from './App.jsx';
import store from 'Redux/store';
import ReactDOM from 'react-dom';
import 'Styles/simplebar.min.css';
import 'Styles/normalize.min.css';
import theme from 'Styles/theme.js';
import { Provider } from 'react-redux';
import GlobalStyles from 'Styles/global.js';
import { ThemeProvider } from 'styled-components';
import { SocketProvider } from 'Util/api/websocket.js';

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
