import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Container, Menu, List, ListItem } from './styles.js';
import IconButton from 'Shared/Buttons/IconButton.jsx';
import MenuButton from 'Shared/Buttons/MenuButton.jsx';
import GearSVG from 'Assets/icons/gear.svg.js';
import LogoSrc from 'Assets/logos/logo_1a.png';
import Title from 'Shared/Title/Title.jsx';

/**
 * @props icon {SVG Component} // required
 */

export default function Dropdown(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Hooks
    const [menuOpen, setMenuOpen] = useState(false);
    const searchRef = useRef();

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onToggle = (e) => {
        console.log('===> onToggle');

        console.log('===> END - onToggle');
    };
    
    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderChildren = useCallback(() => {
        console.log(typeof props.children);
        console.log(props.children);
        if (!(props.children === undefined) && props.children.length) {
            return [...Array(props.children.length)].map((x, i) => (
                <ListItem  key={i}>
                    {props.children[i]}
                </ListItem>
            ));
        }
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container>
                <IconButton onclick={onToggle()} icon={props.icon} size={25} />
                <Menu>
                    <List>{renderChildren()}</List>
                    {/* <List>{props.children}</List> */}
                </Menu>
            </Container>
        </>
    );
}
