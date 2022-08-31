import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
import Button from './styles.js';
import React from 'react';

/**
 * @props icon {SVG Component}
 * @props text {string} Text to be displayed on button // required
 * @props data {string} Value to be placed in data-value attribute
 */

export default function MenuButton(props) {
    return (
        <>
            <StyledMenuButton
                type='button'
                onClick={props.onClick}
                data-value={props.data ? props.data : ''}
                icon={props.icon ? true : false}
            >
                {props.icon ? props.icon() : ''}{props.text}
            </StyledMenuButton>
        </>
    );
}

const StyledMenuButton = styled(Button)`
    font-size: 1rem;
    font-weight: 400;

    padding: ${sizes.spacing.app};
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    color: ${({ theme }) => theme.menu.text};
    background: ${({ theme }) => theme.menu.bg};

    &:hover {
        color: ${({ theme }) => theme.menu.text_hover};
        background: ${({ theme }) => theme.menu.bg_hover};
    }

    & :first-child {
        margin-right: ${(props) => props.icon ? '5px' : 0};
        height: ${(props) => props.icon ? '1.2rem' : 0};
        width: auto;
    }
`;
