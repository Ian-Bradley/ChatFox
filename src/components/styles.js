import styled from 'styled-components';
import {
    APP_FONT_SIZE,
    APP_BG_MAIN_1,
    APP_BG_MAIN_2,
    APP_FONT_COLOR,
    APP_SPACING,
    APP_WIDTH_SIDEBAR,
} from '../styles/constants.js';
/*======================================*/
export const MainApp = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;

    font-family: 'Open Sans', sans-serif;
    font-size: ${APP_FONT_SIZE};

    background: ${APP_BG_MAIN_1};
    color: ${APP_FONT_COLOR};
`;
/*======================================*/
export const ContainerApp = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
`;
/*======================================*/
export const ContainerBody = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
`;
/*======================================*/
export const ContainerChat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;
/*======================================*/
export const ContainerSidebar = styled.div`
    width: ${APP_WIDTH_SIDEBAR};
    height: 100%;

    background: ${APP_BG_MAIN_2};
`;
/*======================================*/

/*
DEV TOOLS
*/
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
export const DevInfo = styled.div`
    width: auto;
    white-space: nowrap;
`;
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
export const DevListItem = styled.li`
    margin-top: 6px;
`;
/*======================================*/
export const DevTitle = styled.span`
    font-weight: 800;
    border: 2px solid black;
    padding: 0px 2px;
`;
/*======================================*/
export const DevTools = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;
/*======================================*/
