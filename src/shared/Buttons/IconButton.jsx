import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon (SVG Component)
 * @props data (String) Value to be placed in data-value attribute
 * @props size (String) px value to size icon
 */

export default function IconButton(props) {
    return (
        <>
            <StyledIconButton
                type='button'
                size={props.size}
                onClick={props.onClick}
                data-value={props.data ? props.data : ''}
            >
                {props.icon()}
            </StyledIconButton>
        </>
    );
}

const StyledIconButton = styled(Button)`
    width: ${props => props.size ? props.size : '20px'};
    height: ${props => props.size ? props.size : '20px'};

    padding: 0;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.button_icon.text};
    background: ${({ theme }) => theme.button_icon.bg};

    &:hover {
        color: ${({ theme }) => theme.button_icon.text_hover};
        background: ${({ theme }) => theme.button_icon.bg_hover};
    }
`;
