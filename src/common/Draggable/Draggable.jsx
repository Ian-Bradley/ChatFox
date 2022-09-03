import React, { useRef } from 'react';
import { Container, Trigger } from './styles.js';

/**
 * @props initial {object} top & left properties for initial positioning
 */

// Basic WC3 implementation
// https://www.w3schools.com/howto/howto_js_draggable.asp

export default function Draggable(props) {
    const dragRef = useRef();

    const onDrag = (e) => {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0,
            top = 0,
            left = 0;

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
            top = dragRef.current.offsetTop - pos2;
            left = dragRef.current.offsetLeft - pos1;
            if (top > window.innerHeight) {
                top = window.innerHeight - 6;
            }
            if (top < 0 - dragRef.current.offsetHeight) {
                top = 6 - dragRef.current.offsetHeight;
            }
            if (left > window.innerWidth) {
                left = window.innerWidth - 6;
            }
            if (left < 0 - dragRef.current.offsetWidth) {
                left = 6 - dragRef.current.offsetWidth;
            }
            dragRef.current.style.top = top + 'px';
            dragRef.current.style.left = left + 'px';
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
