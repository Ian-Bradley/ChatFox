import React, { useContext, createContext } from 'react';
import { WS_URL } from 'Util/helpers/constants.js';

const WS = new WebSocket(WS_URL);
const SocketContext = createContext();

// ==> FOR COMPONENTS TO SEND
export const useSocket = () => useContext(SocketContext);

// ==> FOR INDEX.JSX
export function SocketProvider(props) {
    return (
        <SocketContext.Provider value={WS}>
            {props.children}
        </SocketContext.Provider>
    );
}
