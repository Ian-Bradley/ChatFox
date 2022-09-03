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
const WSServer = new SocketServer.Server({ server });

const StateTracker = require('./lib/state/StateTracker.js');
const WSState = new StateTracker();
WSState.initializeData();

/*================================================
    BLOCK: BROADCAST FUNCTIONS
==================================================*/

WSServer.broadcastToOthers = (data, client) => {
    WSServer.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && client !== client) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

WSServer.broadcastToClient = (data, client) => {
    if (client.readyState === SocketServer.OPEN) {
        client.send(data);
    }
};

/*================================================*/
/*================================================*/

WSServer.broadcastToAll = (data) => {
    WSServer.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================
    BLOCK: WEBSOCKET SERVER
==================================================*/

WSServer.on('connection', async (client, request) => {
    console.log('======= CLIENT CONNECTED');

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
                WSServer.broadcastToClient(JSON.stringify(wsData), client);

                // ==> Send user data to all other users
                const userData = {
                    id: uuidv4(), // message id
                    type: 'userConnected',
                    user: user,
                };
                WSServer.broadcastToOthers(JSON.stringify(userData), client);
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
                    disconnectID = messageData.user.id;

                    // ==> Send state data to user
                    const wsData = {
                        id: uuidv4(), // message id
                        type: 'connectionReady',
                        users: WSState.state.users,
                        channels: WSState.state.channels,
                    };
                    WSServer.broadcastToClient(JSON.stringify(wsData), client);

                    // ==> Send new user data to all other clients
                    messageData.id = uuidv4();
                    WSState.addUser(messageData.user);
                    WSServer.broadcastToOthers(JSON.stringify(messageData), client);
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => userDisconnected (LOGOUT)
                case 'userDisconnected': {
                    console.log('======= User Disonnected ==> ', WSState.getUser(messageData.userID));
                    WSState.removeUser(messageData.userID);
                    console.log('messageData: ', messageData);
                    WSServer.broadcastToOthers(JSON.stringify(messageData), client);
                    console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');
                    console.log('======= User Disonnected ==> ', WSState.getUser(messageData.userID));
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserName
                case 'updateUserName': {
                    console.log('======= START - MESSAGE - updateUserName =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.users.updateUser();
                    WSState.setUserName(messageData.userID, messageData.name);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserName >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserName =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserNickname
                case 'updateUserNickname': {
                    console.log('======= START - MESSAGE - updateUserNickname =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    WSState.setUserNickname(messageData.userID, messageData.nickname);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserNickname >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserNickname =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateUserColor
                case 'updateUserColor': {
                    console.log('======= START - MESSAGE - updateUserColor =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    WSState.setUserColor(messageData.userID, messageData.color);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserColor >>>>>>>>>');
                    console.log('======= END MESSAGE - updateUserColor =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => addChannel
                case 'addChannel': {
                    console.log('======= START - MESSAGE - addChannel =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: TEST QUERY
                    await dbQuery.channels.insertChannel(messageData.channel);
                    WSState.addChannel(messageData.channel);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - addChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - addChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => deleteChannel
                case 'deleteChannel': {
                    console.log('======= START - MESSAGE - deleteChannel =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: TEST QUERY
                    await dbQuery.channels.deleteChannel(messageData.channelID);
                    WSState.deleteChannel(messageData.channelID);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - deleteChannel >>>>>>>>>');
                    console.log('======= END MESSAGE - deleteChannel =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelName
                case 'updateChannelName': {
                    console.log('======= START - MESSAGE - updateChannelName =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelName(messageData.channelID, messageData.name);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelName >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelName =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelDescription
                case 'updateChannelDescription': {
                    console.log('======= START - MESSAGE - updateChannelDescription =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelDescription(messageData.channelID, messageData.description);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelDescription >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelDescription =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPublic
                case 'updateChannelPublic': {
                    console.log('======= START - MESSAGE - updateChannelPublic =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPublic(messageData.channelID);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPublic >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPublic =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPrivate
                case 'updateChannelPrivate': {
                    console.log('======= START - MESSAGE - updateChannelPrivate =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPrivate(messageData.channelID, messageData.password);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPrivate >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPrivate =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => updateChannelPassword
                case 'updateChannelPassword': {
                    console.log('======= START - MESSAGE - updateChannelPassword =======');
                    console.log(messageData);
                    messageData.id = uuidv4();
                    // TODO: QUERY
                    // await dbQuery.channels.updateChannel();
                    WSState.setChannelPassword(messageData.channelID, messageData.password);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
                    console.log('>>>>>>>>> MESSAGE SENT - updateChannelPassword >>>>>>>>>');
                    console.log('======= END MESSAGE - updateChannelPassword =======');
                    break;
                }
                /*================================================*/
                /*================================================*/
                // HANDLER: => newMessage
                case 'newMessage': {
                    messageData.id = uuidv4();
                    messageData.message.id = uuidv4();
                    await dbQuery.messages.insertMessage(messageData.message);
                    WSServer.broadcastToAll(JSON.stringify(messageData));
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
        console.log('======= Client Disonnected ==> ', WSState.getUser(disconnectID));
        const user = WSState.getUser(disconnectID);
        if (user) {
            WSState.removeUser(disconnectID);
            const disconnectData = {
                id: uuidv4(),
                type: 'userDisconnected',
                userID: disconnectID,
                log: {
                    type: 'disconnect',
                    user: user,
                    time: new Date.now(),
                },
            };
            WSServer.broadcastToOthers(JSON.stringify(disconnectData), client);
        }
        console.log('======= Client Disonnected ==> ', WSState.getUser(disconnectID));
    });
});
