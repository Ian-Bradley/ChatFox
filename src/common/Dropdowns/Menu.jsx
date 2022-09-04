import React, { useState, useCallback, useEffect } from 'react';

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

    /*================================================
        BLOCK: EVENTS
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
                    <Menu>
                        <List>{renderChildren()}</List>
                    </Menu>
                )}
            </Container>
        </>
    );
}
