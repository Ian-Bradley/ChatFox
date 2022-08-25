import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Container, Trigger } from './styles.js';

/**
 * @props
 */

// Basic WC3 implementation
// https://www.w3schools.com/howto/howto_js_draggable.asp

export default function Draggable(props) {
    const dragRef = useRef();

    const onDrag = (e) => {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        const dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            dragRef.current.style.top = dragRef.current.offsetTop - pos2 + 'px';
            dragRef.current.style.left = dragRef.current.offsetLeft - pos1 + 'px';
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        dragMouseDown(e);
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container ref={dragRef} initial={props.initial}>
                <Trigger onMouseDown={onDrag} />
                {props.children}
            </Container>
        </>
    );
}
