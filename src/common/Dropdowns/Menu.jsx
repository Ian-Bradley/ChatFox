import React, { useState, useCallback, useEffect, useRef } from 'react';

// COMPONENTS
import { Container, Menu, List, ListItem } from './styles.js';
import IconButton from 'Common/Buttons/IconButton.jsx';

// UTIL
import { KEYCODE_ESCAPE } from 'Util/helpers/constants.js';

/**
 * @props icon {SVG Component} // required
 */

export default function Dropdown(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Hooks
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    /*================================================
        BLOCK: OPENING & CLOSING
    ==================================================*/

    const onToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    /*================================================*/
    /*================================================*/

    const onEscapeClose = (e) => {
        e.keyCode === KEYCODE_ESCAPE && setMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', onEscapeClose);

        return () => {
            window.removeEventListener('keydown', onEscapeClose);
        };
    }, []);

    /*================================================*/
    /*================================================*/

    const onListClose = () => {
        menuOpen && setMenuOpen(false);
    };

    /*================================================*/
    /*================================================*/

    const onClickClose = (e) => {
        // console.log('========E========');
        // console.log(e);
        // console.log(menuRef);
        if (e.target === menuRef) {
            console.log('TEST');
        }
        // setMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', onClickClose);

        return () => {
            window.removeEventListener('click', onClickClose);
        };
    }, []);

    // ==> Off-modal click
    // const onOverlayClose = (e) => {
    //     handleClose();
    // };

    // const onPreventBubbling = (e) => {
    //     e.stopPropagation();
    // };

    /*================================================*/
    /*================================================*/

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderChildren = useCallback(() => {
        if (!(props.children === undefined)) {
            if (props.children.constructor === Array) {
                return [...Array(props.children.length)].map((x, i) => (
                    <ListItem key={i} onClick={onListClose}>
                        {props.children[i]}
                    </ListItem>
                ));
            } else {
                return <ListItem onClick={onListClose}>{props.children}</ListItem>;
            }
        }
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container>
                <IconButton onClick={onToggleMenu} icon={props.icon} size={25} />
                {menuOpen && (
                    <Menu ref={menuRef}>
                        <List>{renderChildren()}</List>
                    </Menu>
                )}
            </Container>
        </>
    );
}
