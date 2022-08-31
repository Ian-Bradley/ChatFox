import React, { useState, useCallback, useRef } from 'react';

// COMPONENTS
import { Container, Menu, List, ListItem } from './styles.js';
import IconButton from 'Shared/Buttons/IconButton.jsx';

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
        BLOCK: EVENTS
    ==================================================*/

    const onClose = () => {
        console.log('CLOSING');
        setMenuOpen(false);
    }

    /*================================================*/
    /*================================================*/

    const onToggle = () => {
        console.log('TOGGLING');
        // TODO: close on outside click
        // menuOpen ? window.addEventListener('click', onClose) : window.removeEventListener('click', onClose);
        setMenuOpen(!menuOpen);
    };

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderChildren = useCallback(() => {
        if (!(props.children === undefined)) {
            if (props.children.constructor === Array) {
                return [...Array(props.children.length)].map((x, i) => (
                    <ListItem key={i}>{props.children[i]}</ListItem>
                ));
            } else {
                return <ListItem>{props.children}</ListItem>;
            }
        }
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container>
                <IconButton onClick={onToggle} icon={props.icon} size={25} />
                <Menu ref={menuRef} open={menuOpen}>
                    <List>{renderChildren()}</List>
                </Menu>
            </Container>
        </>
    );
}
