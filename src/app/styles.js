import styled from 'styled-components';
import { FULL_SIZE } from '../styles/common.js';
import { APP_WIDTH_SIDEBAR } from '../styles/constants.js';
/*======================================*/
/*======================================*/
export const ContainerApp = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ContainerBody = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ContainerChat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ContainerSidebar = styled.div`
    width: ${APP_WIDTH_SIDEBAR};
    height: 100%;

    background: ${({ theme }) => theme.color.bg.main_2};
`;
/*======================================*/
/*======================================*/
/*======================================*/
/*======================================*/
/*
DEV TOOLS
*/
/*======================================*/
/*======================================*/
/*======================================*/
export const Dev = styled.div`
    position: fixed;
    top: 0;
    right: 267px;
    z-index: 1000;
    display: flex;
    flex-flow: column nowrap;
`;
/*======================================*/
/*======================================*/
export const DevInfo = styled.div`
    width: auto;
    white-space: nowrap;
`;
/*======================================*/
/*======================================*/
export const DevList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
`;
/*======================================*/
/*======================================*/
export const DevListItem = styled.li`
    margin-top: 6px;
`;
/*======================================*/
/*======================================*/
export const DevTitle = styled.span`
    font-weight: 800;
    border: 2px solid black;
    padding: 0px 2px;
`;
/*======================================*/
/*======================================*/
export const DevTools = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;
/*======================================*/
/*======================================*/
