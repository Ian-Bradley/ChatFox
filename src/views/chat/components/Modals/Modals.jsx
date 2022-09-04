import { useSocket } from 'Util/api/websocket.js';
import { useSelector } from 'react-redux';
import React from 'react';

// COMPONENETS
import Modal from 'Common/Modal/Modal.jsx';

/**
 * @props
 */

export default function Modals(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const modals = useSelector((state) => {
        return state['modals'].modals;
    });

    // Hooks
    const socket = useSocket();

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // let newUpdate = {
    //     type: 'addChannel',
    //     channel: {
    //         name: 'test',
    //         active: false,
    //         locked: false,
    //         password: '',
    //         users: [],
    //     },
    // };
    // socket.send(JSON.stringify(newUpdate));

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    const renderModals = () => {
        if (modals.preferences) {
            return <Modal modal={'preferences'}>Preferences</Modal>;
        }
        if (modals.addChannel) {
            return <Modal modal={'addChannel'}>addChannel</Modal>;
        }
        if (modals.editChannel) {
            return <Modal modal={'editChannel'}>editChannel</Modal>;
        }
        if (modals.editUser) {
            return <Modal modal={'editUser'}>editUser</Modal>;
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return <>{renderModals()}</>;
}
