/*================================================
    BLOCK: CONFIGURATION
==================================================*/

// ==> Packages
const path = require('path');
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// ==> Imports
const jwtHandler = require('./lib/util/jwt/jwt.js');

// ==> Utilities
const dbQuery = require('./lib/db/root.query');
const Util = require('./lib/util/util.js');
const config = require('./config.env.js');

// ==> API
const messagesAPI = require('./lib/api/messages.api.js');
const channelsAPI = require('./lib/api/channels.api.js');
const register = require('./lib/api/auth/register.js');
const usersAPI = require('./lib/api/users.api.js');
const login = require('./lib/api/auth/login.js');

// ==> Routes
const routes = require('./lib/routes/routes.js');

// ==> Initiating express server
const server = express()
    .use(cors())
    .use(express.json())
    .use(express.static(path.join(__dirname, '..', 'dist')))
    .use('/api/messages', messagesAPI)
    .use('/api/channels', channelsAPI)
    .use('/api/register', register)
    .use('/api/users', usersAPI)
    .use('/api/login', login)
    .use('/', routes)
    .listen(config.server.port, config.server.ip, config.server.domain, () => {
        console.log(`Listening on ${config.server.domain}:${config.server.port}`);
    });

// ==> Initiating socket server & state
const SocketServer = require('ws');
const WSS = new SocketServer.Server({ server });

const StateTracker = require('./lib/state/StateTracker.js');
const WSState = new StateTracker();
WSState.initializeData();

/*================================================
    BLOCK: BROADCAST FUNCTIONS
==================================================*/

WSS.broadcastToOthers = (data, client) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && client !== client) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

WSS.broadcastToClient = (data, client) => {
    if (client.readyState === SocketServer.OPEN) {
        client.send(data);
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

WSS.on('connection', async (client, request) => {
    console.log('======= CLIENT CONNECTED =======');

    // Minor state variable for disconnecting client from WSState & client state
    let disconnectID = '';

    /*================================================
        INNER: > JWT COOKIE SESSION
    ==================================================*/

    // ==> Check for and parse cookie
    let cookies = {};
    if (request.headers.cookie) {
        cookies = Util.parseCookies(request.headers.cookie);
    }

    // ==> Manage session
    if (cookies['sessionid']) {
        try {
            // ==> Resolve and validate
            const token = cookies['sessionid'].split(' ')[0];
            const decoded = Util.validateAuthToken(token);
            if (decoded.user_id) {
                // ==> Get user data
                const results = await dbQuery.users.getUser(decoded.user_id);
                const user = {
                    id: results[0].id,
                    name: results[0].name,
                };

                // ==> Set user in state
                WSState.addUser(user);
                disconnectID = user.id;

                // ==> Send state + user data to user
                const wsData = {
                    id: uuidv4(), // message id
                    type: 'connectionReady',
                    users: WSState.state.users,
                    channels: WSState.state.channels,
                    user: user,
                };
                WSS.broadcastToClient(JSON.stringify(wsData), client);

                // ==> Send user data to all other users
                const userData = {
                    id: uuidv4(), // message id
                    type: 'userConnected',
                    user: user,
                };
                WSS.broadcastToOthers(JSON.stringify(userData), client);
            }
        } catch (err) {
            console.error(err);
        }
    }

    /*================================================
        INNER: > HANDLERS
    ==================================================*/

    client.on('message', async (data) => {
        const messageData = JSON.parse(data);
        console.log('>>>>> MESSAGE RECIEVED - ' + messageData.type);
        try {
            switch (messageData.type) {
                /*================================================*/
                /*================================================*/
                // HANDLER: => userConnected (LOGIN)
                case 'userConnected': {
                    // NOTE: testing
                    disconnectID = messageData.user.id;

                    // ==> Send state data to user
                    const wsData = {
                        id: uuidv4(), // message id
                        type: 'connectionReady',
                        users: WSState.state.users,
                        channels: WSState.state.channels,
                    };
                    WSS.broadcastToClient(JSON.stringify(wsData), client);

                    // ==> Send new user data to all other users
                    messageData.id = uuidv4();
                    WSState.addUser(messageData.user);
                    WSS.broadcastToOthers(JSON.stringify(messageData), client);
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => userDisconnected (LOGOUT)
                case 'userDisconnected': {
                    // ==> Log message
                    // let disconnectMessage = {
                    //     type: 'notification-disconnect',
                    //     name: disconnectID,
                    //     time: new Date().toGMTString(),
                    // };
                    // console.log('disconnectMessage: ', disconnectMessage);

                    // ==> Remove user
                    WSState.removeUser(disconnectID);

                    // ==> Update other clients
                    const messageData = {
                        id: uuidv4(),
                        type: 'userDisconnected',
                        name: disconnectID,
                        // message: disconnectMessage,
                    };
                    console.log('messageData: ', messageData);
                    WSS.broadcastToOthers(JSON.stringify(messageData), client);
                    console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserName
                case 'updateUserName': {
                    console.log('======= START - MESSAGE - updateUserName =======');
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.users.updateUser();
                    WSState.setUserName(messageData.userID, messageData.name);
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
                    WSState.setUserNickname(messageData.userID, messageData.nickname);
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
                    WSState.setUserColor(messageData.userID, messageData.color);
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
                    // TODO: TEST QUERY
                    await dbQuery.channels.insertChannel(messageData.channel);
                    WSState.addChannel(messageData.channel);
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
                    // TODO: TEST QUERY
                    await dbQuery.channels.deleteChannel(messageData.channelID);
                    WSState.deleteChannel(messageData.channelID);
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
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelName(messageData.channelID, messageData.name);
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
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelDescription(messageData.channelID, messageData.description);
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
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPublic(messageData.channelID);
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
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPrivate(messageData.channelID, messageData.password);
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
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPassword(messageData.channelID, messageData.password);
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
                    dispatch(addUserToChannel(messageData.channelID, updateData.userName));
                    console.log('>>>>>>>>> MESSAGE SENT - addUserToChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - addUserToChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => removeUserFromChannel
                case 'removeUserFromChannel': {
                    console.log('======= START - MESSAGE - removeUserFromChannel =======');
                    dispatch(removeUserFromChannel(messageData.channelID, updateData.userName));
                    console.log('>>>>>>>>> MESSAGE SENT - removeUserFromChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - removeUserFromChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => newMessage
                case 'newMessage': {
                    messageData.id = uuidv4();
                    messageData.message.id = uuidv4();
                    await dbQuery.messages.insertMessage(messageData.message);
                    WSS.broadcastToAll(JSON.stringify(messageData));
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

    client.on('close', (client) => {
        console.log('======= START - Client Disonnected =======');

        if (WSState.getUser(disconnectID)) {
            // ==> Remove user
            WSState.removeUser(disconnectID);

            // ==> Update other clients
            const disconnectData = {
                id: uuidv4(),
                type: 'userDisconnected',
                userID: disconnectID,
                // message: {
                //     type: 'notification-disconnect',
                //     name: disconnectID,
                //     time: new Date.now(),
                // },
            };
            WSS.broadcastToOthers(JSON.stringify(disconnectData), client);
        }

        console.log('======= END - Client Disonnected =======');
    });
});
