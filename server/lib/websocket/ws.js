/*================================================
    BLOCK: CONFIGURATION
==================================================*/


const SocketServer = require('ws');
const WS = new SocketServer();

const handlers = require('./root.handler.js');
WS.handler = handlers;

const StateTracker = require('./StateTracker.js');
const wsState = new StateTracker();

/*================================================
    BLOCK: BROADCAST FUNCTIONS
==================================================*/

WS.broadcast = (data, wsClient) => {
    WS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && wsClient !== client) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

WS.broadcastClient = (data, wsClient) => {
    if (wsClient.readyState === SocketServer.OPEN) {
        wsClient.send(data);
    }
};

/*================================================*/
/*================================================*/

WS.broadcastAll = (data) => {
    WS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

module.exports = { WS, wsState };
