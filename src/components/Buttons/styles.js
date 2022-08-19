import { transition } from '../../styles/common.js';
import styled from 'styled-components';
const Button = styled.button`
    font-size: 1.1rem;

    outline: none;
    border: none;

    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;

    transition: all linear ${transition.hover};

    color: ${({ theme }) => theme.color.button.text};
    background: ${({ theme }) => theme.color.button.bg};

    &:hover {
        background: ${({ theme }) => theme.color.button.bg_hover};
    }

    & svg, & path {
        pointer-events: none;
    }

`;
export default Button;
// ${props => props.primary ? "white" : "palevioletred"};
