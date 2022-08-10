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
    padding: ${APP_SPACING};
`;
/*======================================*/
export const ContainerSidebar = styled.div`
    width: ${APP_WIDTH_SIDEBAR};
    height: 100%;

    background: ${APP_BG_MAIN_2};
`;
/*======================================*/
