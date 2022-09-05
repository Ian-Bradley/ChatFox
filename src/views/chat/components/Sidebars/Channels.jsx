import { useSelector, useDispatch } from 'react-redux';
import React, { useCallback } from 'react';

// COMPONENTS
import IconButton from 'Common/Buttons/IconButton.jsx';
import PlusSVG from 'Assets/icons/plus.svg.js';
import Channel from '../Channel/Channel.jsx';
import Sidebar from './Sidebar.jsx';

// REDUX
import { setModalActive } from 'Redux/slices/modals.slice.js';

export default function ChannelList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onAddChannel = (e) => {
        dispatch(setModalActive('addChannel'));
    };

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderChannels = useCallback(() => {
        if (!(channels === undefined) && channels.length) {
            return [...Array(channels.length)].map((x, i) => (
                <Channel key={i} channel={channels[i]} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <>
            <Sidebar
                type={'channel'}
                header={<IconButton onClick={onAddChannel} icon={PlusSVG} />}
                list={channels}
            >
                {renderChannels()}
            </Sidebar>
        </>
    );
}
