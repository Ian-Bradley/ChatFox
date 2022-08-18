import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon (String) File destinaton to find image
 * @props text (String) Text to be displayed on button
 */

export default function IconButton(props) {
    return (
        <>
            <StyledIconButton type='button' props>
                <img src={props.icon} /> {props.text}
            </StyledIconButton>
        </>
    );
}

const StyledIconButton = styled(Button)`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`;
