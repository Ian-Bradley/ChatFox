import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props text (String) Text to be displayed on button
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
    width: 100%;
    height: 30px;
`;
