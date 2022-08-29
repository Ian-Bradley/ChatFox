/*================================================
    BLOCK: CONFIGURATION
==================================================*/

// ==> Packages
const path = require('path');
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const config = require('./config.env.js');

const dbQuery = require('./lib/db/root.query');

// ==> API
const login = require('./lib/api/auth/login.js');
const register = require('./lib/api/auth/register.js');
const usersAPI = require('./lib/api/users.api.js');
const channelsAPI = require('./lib/api/channels.api.js');
const messagesAPI = require('./lib/api/messages.api.js');

// ==> Routes
// const routes = require('./lib/routes/routes.js');

// ==> Initiating express server
const server = express()
    .use(cors())
    .use(express.json())
    .use(express.static(path.join(__dirname, '..', 'dist')))
    .use('/api/login', login)
    .use('/api/register', register)
    .use('/api/users', usersAPI)
    .use('/api/channels', channelsAPI)
    .use('/api/messages', messagesAPI)
    // .use('/', routes)
    .listen(config.server.port, config.server.ip, config.server.domain, () => {
        console.log(`Listening on ${config.server.domain}:${config.server.port}`);
    });

// ==> Initiating socket server & state
const SocketServer = require('ws');
const WSS = new SocketServer.Server({ server });

const SocketState = require('./lib/state/SocketState.js');
const WSState = new SocketState();

/*================================================
    BLOCK: BROADCAST FUNCTIONS
==================================================*/

WSS.broadcastToOthers = (data, WSClient) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && WSClient !== client) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

WSS.broadcastToClient = (data, WSClient) => {
    if (WSClient.readyState === SocketServer.OPEN) {
        WSClient.send(data);
    }
};

/*================================================*/
/*================================================*/

WSS.broadcastToAll = (data) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================
    BLOCK: WEBSOCKET SERVER
==================================================*/

WSS.on('connection', async (WSClient) => {
    console.log('======= CLIENT CONNECTED =======');

    /*================================================
        INNER: > HANDLERS
    ==================================================*/

    WSClient.on('message', async function incoming(data) {
        const messageData = JSON.parse(data);
        console.log('>>>>>>>>> MESSAGE RECIEVED - '+ messageData.type +' >>>>>>>>>');
        try {
            switch (messageData.type) {
                /*================================================*/
                /*================================================*/
                // HANDLER: => userConnected
                case 'userConnected': {
                    console.log('======= START - MESSAGE - userConnected =======');
                    // ==> Send connecting user websocket state data + messages for default channel (name=lounge, id=1)
                    const data = {
                        id: uuidv4(), // message id
                        type: 'connectionReady',
                        users: WSState.state.users,
                        channels: WSState.state.channels,
                    };
                    WSS.broadcastToClient(JSON.stringify(data), WSClient);
                    console.log('>>>>>>>>> MESSAGE SENT - Client - State Data >>>>>>>>>');

                    // ==> Send new user data to all other users
                    messageData.id = uuidv4();
                    // WSClientData.userID = messageData.user.id; // set id for disconnecting user removal
                    WSState.addUser(messageData.user);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToOthers(JSON.stringify(messageData), WSClient);
                    console.log('>>>>>>>>> MESSAGE SENT - userConnected >>>>>>>>>');
                    console.log('======= END MESSAGE - userConnected =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserName
                case 'updateUserName': {
                    console.log('======= START - MESSAGE - updateUserName =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setUserName(messageData.user, messageData.newName);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserName >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserName =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserNickname
                case 'updateUserNickname': {
                    console.log('======= START - MESSAGE - updateUserNickname =======');
                    messageData.id = uuidv4();
                    WSState.setUserNickname(messageData.user, messageData.newNickname);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserNickname >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserNickname =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserColor
                case 'updateUserColor': {
                    console.log('======= START - MESSAGE - updateUserColor =======');
                    messageData.id = uuidv4();
                    WSState.setUserColor(messageData.user, messageData.newColor);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserColor >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserColor =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => addChannel
                case 'addChannel': {
                    console.log('======= START - MESSAGE - addChannel =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.addChannel(messageData.channel);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - addChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - addChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => deleteChannel
                case 'deleteChannel': {
                    console.log('======= START - MESSAGE - deleteChannel =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.deleteChannel(messageData.name);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - deleteChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - deleteChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelName
                case 'updateChannelName': {
                    console.log('======= START - MESSAGE - updateChannelName =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setChannelName(messageData.channelName, messageData.newName);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelName >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelName =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelDescription
                case 'updateChannelDescription': {
                    console.log('======= START - MESSAGE - updateChannelDescription =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setChannelDescription(messageData.channelName, messageData.description);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelDescription >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelDescription =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPublic
                case 'updateChannelPublic': {
                    console.log('======= START - MESSAGE - updateChannelPublic =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setChannelPublic(messageData.channelName);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPublic >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPublic =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPrivate
                case 'updateChannelPrivate': {
                    console.log('======= START - MESSAGE - updateChannelPrivate =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setChannelPrivate(messageData.channelName, messageData.password);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPrivate >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPrivate =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPassword
                case 'updateChannelPassword': {
                    console.log('======= START - MESSAGE - updateChannelPassword =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    WSState.setChannelPassword(messageData.channelName, messageData.password);
                    // WSState.addLogItem(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPassword >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPassword =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => addUserToChannel
                case 'addUserToChannel': {
                    console.log('======= START - MESSAGE - addUserToChannel =======');
                    dispatch(addUserToChannel(messageData.channelName, updateData.userName));
                    // dispatch(addLogItem(updateData.message));
                    console.log('>>>>>>>>> MESSAGE SENT - addUserToChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - addUserToChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => removeUserFromChannel
                case 'removeUserFromChannel': {
                    console.log('======= START - MESSAGE - removeUserFromChannel =======');
                    dispatch(removeUserFromChannel(messageData.channelName, updateData.userName));
                    // dispatch(addLogItem(updateData.message));
                    console.log('>>>>>>>>> MESSAGE SENT - removeUserFromChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - removeUserFromChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => newMessage
                case 'newMessage': {
                    // console.log('======= START - MESSAGE - newMessage =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY -  addMessage
                    WSS.broadcastToAll(JSON.stringify(messageData));
                    // console.log('>>>>>>>>> MESSAGE SENT - newMessage >>>>>>>>>');
                    // console.log('======= END - MESSAGE - newMessage =======');

                    break;
                }
                /*================================================*/
                /*================================================*/
                default:
            }
        } catch (err) {
            console.error(err);
        }
    });

    /*================================================
        INNER: > DISCONNECTION
    ==================================================*/

    WSClient.on('close', (WSClient) => {
        console.log('======= START - Client Disonnected =======');

        // console.log(
        //     'find user: ',
        //     WSState.state.users.find((user) => (user.id = WSClientData.userID))
        // );

        // Disconnect message
        // TODO: error when refreshing?
        // let disconnectMessage = {
        //     type: 'notification-disconnect',
        //     name: WSState.state.users.find((user) => (user.id = WSClientData.userID)).name,
        //     time: new Date().toGMTString(),
        //     color: WSState.state.users.find((user) => (user.id = WSClientData.userID)).color,
        // };
        // console.log('disconnectMessage: ', disconnectMessage);
        // WSState.addMessage(disconnectMessage);

        // Disconnect data for other users
        // const messageData = {
        //     id: uuidv4(), // message id
        //     type: 'userDisconnected',
        //     userID: WSClientData.userID, // user removal id
        //     message: disconnectMessage,
        // };
        // console.log('messageData: ', messageData);
        // WSS.broadcastToOthers(JSON.stringify(messageData), WSClient);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');

        // Remove user
        // WSState.removeUser(WSClientData.userID);

        console.log('======= END - Client Disonnected =======');
    });
});
