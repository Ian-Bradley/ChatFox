import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Body = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Chat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Sidebar = styled.div`
    position: relative;
    overflow: hidden;

    width: ${sizes.width.sidebar};
    height: 100%;

    background: ${({ theme }) => theme.bg.main_2};

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;
/*======================================*/
/*======================================*/
