import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon {SVG Component} // required
 * @props data {string} Value to be placed in data-value attribute // default empty string ''
 * @props size {number} px value to size icon // default 20px
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
    width: ${props => props.size ? props.size+'px' : '20px'};
    height: ${props => props.size ? props.size+'px' : '20px'};

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
