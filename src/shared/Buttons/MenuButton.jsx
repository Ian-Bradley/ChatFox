import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon (SVG Component)
 * @props text (String) Text to be displayed on button
 * @props rounded (Number) Value for border-radius
 * @props data (String) Value to be placed in data-value attribute
 */

export default function MenuButton(props) {
    return (
        <>
            <StyledMenuButton
                type='button'
                onClick={props.onClick}
                data-value={props.data ? props.data : ''}
                icon={props.icon ? true : false}
                rounded={props.rounded}
            >
                {props.icon ? props.icon() : ''}{props.text}
            </StyledMenuButton>
        </>
    );
}

const StyledMenuButton = styled(Button)`
    font-size: 1.2rem;
    font-weight: 500;

    padding: ${sizes.spacing.app};
    border-radius: ${(props) => props.rounded ? props.rounded : 0}px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.button_menu.text};
    background: ${({ theme }) => theme.button_menu.bg};

    &:hover {
        color: ${({ theme }) => theme.button_menu.text_hover};
        background: ${({ theme }) => theme.button_menu.bg_hover};
    }

    & :first-child {
        margin-right: ${(props) => props.icon ? '5px' : 0};
        height: ${(props) => props.icon ? '1.2rem' : 0};
    }
`;
