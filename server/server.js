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
const config = require('./config.env.js');
const Util = require('./lib/util/util.js');

// ==> API
const login = require('./lib/api/auth/login.js');
const register = require('./lib/api/auth/register.js');
const usersAPI = require('./lib/api/users.api.js');
const channelsAPI = require('./lib/api/channels.api.js');
const messagesAPI = require('./lib/api/messages.api.js');

// ==> Routes
const routes = require('./lib/routes/routes.js');

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

WSS.on('connection', (client, request) => {
    console.log('======= CLIENT CONNECTED =======');

    // NOTE: testing
    let disconnectData = '';

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
            const token = cookies['sessionid'].split(' ')[0];
            const decoded = Util.validateAuthToken(token);
            if (decoded) {
                console.log('VALID TOKEN');
                console.log(decoded.user_id);
                console.log(typeof decoded.user_id);

                // ==> Get user data from db (use decoded token id)
                const retrieveUser = async (id) => {
                    const results = await dbQuery.users.getUser(id);
                    return results;
                };
                const user = retrieveUser(decoded.user_id);

                // ==> Set disconnect id
                disconnectData = user.id;

                // ==> Send state data to user
                const data = {
                    id: uuidv4(), // message id
                    type: 'connectionReady',
                    users: WSState.state.users,
                    channels: WSState.state.channels,
                };
                WSS.broadcastToClient(JSON.stringify(data), client);

                // // ==> Send new user data to all other users
                messageData.id = uuidv4();
                WSState.addUser(messageData.user);
                WSS.broadcastToOthers(JSON.stringify(messageData), client);
            } else {
                console.log('INVALID TOKEN');
                // INVALID TOKEN
            }
        } catch (err) {
            console.error(err);
        }
    }

    /*================================================
        INNER: > HANDLERS
    ==================================================*/

    client.on('message', async function incoming(data) {
        const messageData = JSON.parse(data);
        console.log('>>>>>>>>> MESSAGE RECIEVED - ' + messageData.type + ' >>>>>>>>>');
        try {
            switch (messageData.type) {
                /*================================================*/
                /*================================================*/
                // HANDLER: => userConnected (LOGIN)
                case 'userConnected': {
                    // NOTE: testing
                    disconnectData = messageData.user.id;

                    // ==> Send state data to user
                    const data = {
                        id: uuidv4(), // message id
                        type: 'connectionReady',
                        users: WSState.state.users,
                        channels: WSState.state.channels,
                    };
                    WSS.broadcastToClient(JSON.stringify(data), client);

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
                    //     name: disconnectData,
                    //     time: new Date().toGMTString(),
                    // };
                    // console.log('disconnectMessage: ', disconnectMessage);

                    // ==> Remove user
                    WSState.removeUser(disconnectData);

                    // ==> Update other clients
                    const messageData = {
                        id: uuidv4(),
                        type: 'userDisconnected',
                        name: disconnectData,
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

        console.log(WSState.state.users.find((user) => (user.name = disconnectData)));

        // ==> Log message
        // let disconnectMessage = {
        //     type: 'notification-disconnect',
        //     name: disconnectData,
        //     time: new Date().toGMTString(),
        // };
        // console.log('disconnectMessage: ', disconnectMessage);

        // ==> Remove user
        WSState.removeUser(disconnectData);

        // ==> Update other clients
        const messageData = {
            id: uuidv4(),
            type: 'userDisconnected',
            name: disconnectData,
            // message: disconnectMessage,
        };
        console.log('messageData: ', messageData);
        WSS.broadcastToOthers(JSON.stringify(messageData), client);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');

        console.log('======= END - Client Disonnected =======');
    });
});
