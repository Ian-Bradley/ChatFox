import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props text (String) Text to be displayed on button
 * @props data (String) Value to be placed in data-value attribute
 */

export default function FormButton(props) {
    return (
        <>
            <StyledFormButton
                type='button'
                onClick={props.onClick}
                data-value={props.data ? props.data : ''}
            >
                {props.text}
            </StyledFormButton>
        </>
    );
}

const StyledFormButton = styled(Button)`
    font-size: 1.1rem;
    font-weight: 400;

    width: 100%;
    height: 30px;

    color: ${({ theme }) => theme.button.text};
    background: ${({ theme }) => theme.button.bg};

    &:hover {
        background: ${({ theme }) => theme.button.bg_hover};
    }
`;
