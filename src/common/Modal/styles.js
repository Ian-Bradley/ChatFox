import { sizes, transition } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    z-index: 100;

    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.bg.modal};
`;
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;
    z-index: 110;

    width: auto;
    height: auto;

    padding: 60px;
    background: ${({ theme }) => theme.bg.main_2};
`;
/*======================================*/
/*======================================*/
export const Close = styled.span`
    position: absolute;
    top: ${sizes.spacing.app};
    right: ${sizes.spacing.app};
    z-index: 110;
`;
/*======================================*/
/*======================================*/
export const CloseTab = styled.span`
    position: fixed;
    top: 0;
    right: 0;

    z-index: 110;

    padding: ${sizes.spacing.app};
    background: ${({ theme }) => theme.bg.main_2};

    transition: transform linear ${transition.fast};
    transform: translate(${(props) => (props.near ? '0, 0' : '50px, -50px')});
`;
/*======================================*/
/*======================================*/
