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

    const modals = useSelector((state) => {
        return state['modals'].modals;
    });

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    const renderModals = () => {
        if (modals.preferences) {
            return <Modal modal={'preferences'}>Preferences</Modal>;
        }
        if (modals.addChannel) {
            return <Modal modal={'preferences'}>addChannel</Modal>;
        }
        if (modals.editChannel) {
            return <Modal modal={'preferences'}>editChannel</Modal>;
        }
        if (modals.editUser) {
            return <Modal modal={'preferences'}>editUser</Modal>;
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return <>{renderModals()}</>;
}
