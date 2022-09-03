import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: fixed;
    top: ${(props) => props.initial.top ? props.initial.top : sizes.border.modal};
    left: ${(props) => props.initial.left ? props.initial.left : sizes.border.modal};
    z-index: 1000;
`;
/*======================================*/
/*======================================*/
export const Trigger = styled.div`
    box-sizing: content-box;
    position: absolute;

    height: 100%;
    width: 100%;

    z-index: -10;
    margin: -${sizes.border.modal};

    border: ${sizes.border.modal} solid ${({ theme }) => theme.border.dark};
    background: ${({ theme }) => theme.border.dark};
`;
/*======================================*/
/*======================================*/