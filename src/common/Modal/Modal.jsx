import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import { Overlay, Container, Close, CloseTab } from './styles.js';
import IconButton from 'Common/Buttons/IconButton.jsx';
import CloseSVG from 'Assets/icons/close.svg.js';

// REDUX
import { setModalInactive } from 'Redux/slices/modals.slice.js';

// UTIL
import { KEYCODE_ESCAPE } from 'Util/helpers/constants.js';

/**
 * @props modal {string}
 */

export default function Modal(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const dispatch = useDispatch();

    // Hooks
    const [nearCloseTab, setNearCloseTab] = useState(null);

    /*================================================
        BLOCK: CLOSING
    ==================================================*/

    // ==> Handler
    const handleClose = () => {
        dispatch(setModalInactive(props.modal));
    };

    // ==> Inner close button
    const onButtonClose = () => {
        handleClose();
    };

    // ==> Outer close button
    const nearCornerDetector = (e) => {
        e.clientY <= 200 && e.clientX >= window.innerWidth - 200
            ? setNearCloseTab(true)
            : setNearCloseTab(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', nearCornerDetector);
        return () => {
            window.removeEventListener('mousemove', nearCornerDetector);
        };
    }, []);

    // ==> Escape button
    const onEscapeClose = (e) => {
        if (e.keyCode === KEYCODE_ESCAPE) {
            handleClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onEscapeClose);
        return () => {
            window.removeEventListener('keydown', onEscapeClose);
        };
    }, []);

    // ==> Off-modal click
    const onOverlayClose = (e) => {
        handleClose();
    };

    const onPreventBubbling = (e) => {
        e.stopPropagation();
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Overlay onClick={onOverlayClose}>
                <CloseTab near={nearCloseTab}>
                    <IconButton onClick={onButtonClose} icon={CloseSVG} size={30} />
                </CloseTab>
                <Container onClick={onPreventBubbling}>
                    <Close>
                        <IconButton onClick={onButtonClose} icon={CloseSVG} size={25} />
                    </Close>
                    {props.children}
                </Container>
            </Overlay>
        </>
    );
}
