import { useDispatch } from 'react-redux';
import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
import React from 'react';

// COMPONENTS
import IconButton from 'Common/Buttons/IconButton.jsx';
import CloseSVG from 'Assets/icons/close.svg.js';

// REDUX
import { setModalInactive } from 'Redux/slices/modals.slice.js';

/**
 * @props modal {string}
 */

export default function Modal(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const dispatch = useDispatch();

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onCloseModal = (e) => {
        dispatch(setModalInactive(e.target.dataset.value));
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Overlay>
                <Close>
                    <IconButton
                        data={props.modal}
                        onClick={onCloseModal}
                        icon={CloseSVG}
                        size={20}
                    />
                </Close>
                <Container>{props.children}</Container>
            </Overlay>
        </>
    );
}

/*================================================
    BLOCK: STYLES
==================================================*/

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    z-index: 100;

    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.bg.modal};
`;

const Container = styled.div`
    position: relative;
    z-index: 110;

    width: auto;
    height: auto;

    background: ${({ theme }) => theme.bg.main_2};
`;

const Close = styled.span`
    position: fixed;
    top: ${sizes.spacing.app};
    right: ${sizes.spacing.app};

    z-index: 110;
`;
