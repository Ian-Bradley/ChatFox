import { FLEX_CENTER_ROW } from 'Styles/common.js';
import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon (SVG Component)
 */

export default function IconButton(props) {
    return (
        <>
            <StyledIconButton
                type='button'
                onClick={props.onClick}
                data-value={props.data ? props.data : ''}
            >
                {props.icon()}
            </StyledIconButton>
        </>
    );
}

const StyledIconButton = styled(Button)`
    width: 20px;
    height: 20px;

    padding: 0;
    ${FLEX_CENTER_ROW}

    color: ${({ theme }) => theme.color.button_icon.text};
    background: ${({ theme }) => theme.color.button_icon.bg};

    &:hover {
        color: ${({ theme }) => theme.color.button_icon.text_hover};
        background: ${({ theme }) => theme.color.button_icon.bg_hover};
    }
`;
