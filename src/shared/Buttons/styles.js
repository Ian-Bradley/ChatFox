import { transition } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
const Button = styled.button`
    outline: none;
    border: none;

    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    
    white-space: nowrap;

    transition: all linear ${transition.hover};

    & svg, & path {
        pointer-events: none;
    }

`;
export default Button;
/*======================================*/
